// pages/GrammarAssessment.jsx
import React, { useState } from 'react'
import { Mic, MicOff, ChevronRight } from 'lucide-react'
import ConversationLayout from '../layout/ConversationLayout'

function GrammarAssessment() {
  const [isRecording, setIsRecording] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const questions = [
    "Describe your typical daily routine.",
    "What did you do last weekend?",
    "What are your plans for the future?",
    "Tell me about your favorite hobby."
  ]

  const handleRecord = () => {
    setIsRecording(!isRecording)
    // Add actual recording logic here
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setIsRecording(false)
    }
  }

  return (
    <ConversationLayout>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestionIndex + 1}/{questions.length}</span>
          <span>Grammar Assessment</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-brand-blue rounded-full h-2 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Display */}
      <div className="text-center mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {questions[currentQuestionIndex]}
        </h2>
        <p className="text-gray-600">
          Press the microphone button and speak your answer
        </p>
      </div>

      {/* Recording Interface */}
      <div className="flex flex-col items-center space-y-6">
        <button
          onClick={handleRecord}
          className={`p-6 rounded-full transition-all duration-300 ${
            isRecording 
              ? 'bg-brand-red text-white animate-pulse'
              : 'bg-brand-blue text-white hover:bg-brand-purple'
          }`}
        >
          {isRecording ? (
            <MicOff className="w-8 h-8" />
          ) : (
            <Mic className="w-8 h-8" />
          )}
        </button>
        <span className="text-sm text-gray-600">
          {isRecording ? 'Recording...' : 'Click to start recording'}
        </span>
      </div>

      {/* Navigation */}
      <div className="mt-12 flex justify-end">
        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg ${
            currentQuestionIndex === questions.length - 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-brand-blue text-white hover:bg-brand-purple'
          } transition-colors`}
        >
          <span>Next Question</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </ConversationLayout>
  )
}

export default GrammarAssessment