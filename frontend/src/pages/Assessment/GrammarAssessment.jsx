import React, { useState, useRef, useEffect } from "react";
import {
  Mic,
  MicOff,
  ChevronRight,
  Volume2,
  Video,
  VideoOff,
  Clock,
  Target,
  BookOpen,
  Star,
  CheckCircle,
  XCircle,
} from "lucide-react";
import ConversationLayout from "../../layouts/ConversationLayout";
import WaveformVisualizer from "../../components/WaveformVisualizer";
import { motion, AnimatePresence } from "framer-motion";

function GrammarAssessment() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [mediaStream, setMediaStream] = useState(null);
  const videoRef = useRef(null);
  const [assessmentStage, setAssessmentStage] = useState("preview");

  const questions = [
    "Describe your typical daily routine.",
    "What did you do last weekend?",
    "What are your plans for the future?",
    "Tell me about your favorite hobby.",
  ];

  const questionIcons = [
    <Clock key="clock" className="text-brand-blue" size={24} />,
    <BookOpen key="book" className="text-brand-purple" size={24} />,
    <Target key="target" className="text-brand-orange" size={24} />,
    <Star key="star" className="text-brand-yellow" size={24} />,
  ];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      mediaRecorderRef.current = new MediaRecorder(stream);
      setMediaStream(stream);
      videoRef.current.srcObject = stream;
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const mediaBlob = new Blob(chunksRef.current, { type: "video/webm" });
        sendMediaToServer(mediaBlob);
        setAssessmentStage("review");
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setAssessmentStage("recording");
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
      videoRef.current.srcObject = null;
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAssessmentStage("preview");
    }
  };

  const resetAssessment = () => {
    setCurrentQuestionIndex(0);
    setAssessmentStage("preview");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full bg-gradient-to-br from-gray-50 to-gray-100 p-6"
    >
      <div className="h-full flex gap-6">
        {/* Left Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="w-[50%] flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-lg font-bold text-brand-purple flex items-center gap-2"
              >
                <CheckCircle className="text-brand-blue" size={20} />
                Grammar Assessment
              </motion.span>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="px-3 py-1 bg-brand-purple/10 rounded-full text-xs font-medium text-brand-purple"
              >
                {currentQuestionIndex + 1}/{questions.length}
              </motion.span>
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-brand-blue/10 relative overflow-hidden"
          >
            <div className="absolute top-4 right-4">
              {questionIcons[currentQuestionIndex]}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 pr-10">
              {questions[currentQuestionIndex]}
            </h2>
            <p className="text-gray-600 flex items-center gap-2">
              <Volume2 className="text-brand-orange" size={18} />
              Speak clearly into your microphone
            </p>
          </motion.div>

          {/* Recording Interface */}
          <div className="relative">
            <AnimatePresence>
              {!isRecording ? (
                <motion.button
                  key="start-recording"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startRecording}
                  className="w-full h-16 flex items-center justify-center gap-3 bg-gradient-to-r from-brand-blue to-brand-purple text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <Video size={20} />
                  Start Recording
                </motion.button>
              ) : (
                <motion.div
                  key="recording-wave"
                  initial={{ height: 64, opacity: 0.8 }}
                  animate={{ height: 128, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden relative"
                >
                  <WaveformVisualizer
                    isRecording={isRecording}
                    stream={mediaStream}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {isRecording && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={stopRecording}
                className="absolute -top-2 -right-2 bg-brand-red text-white p-3 rounded-full shadow-lg hover:bg-brand-red/90 transition-colors"
              >
                <VideoOff size={20} />
              </motion.button>
            )}
          </div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-auto"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={nextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              className="w-full bg-gradient-to-r from-brand-yellow to-brand-orange text-white py-3 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all"
            >
              Next Question
              <ChevronRight className="ml-2" size={18} />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Section - Video Preview */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="w-[50%]"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-brand-blue/10 h-[calc(100vh-10rem)]">
            <div className="bg-gradient-to-r from-brand-purple/5 to-brand-blue/5 p-4 border-b flex items-center justify-between">
              <h2 className="font-medium text-gray-800">Video Preview</h2>
              <AnimatePresence>
                {isRecording && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2 text-brand-red"
                  >
                    <div className="w-3 h-3 bg-brand-red rounded-full animate-pulse"></div>
                    Recording
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="aspect-video w-full bg-gray-900">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default GrammarAssessment;
