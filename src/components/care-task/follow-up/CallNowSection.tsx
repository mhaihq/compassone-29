import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, PhoneCall, Sparkles, Clock, Calendar } from 'lucide-react';
interface CallNowSectionProps {
  onStartPreCallIntel: () => void;
  onStartCall: () => void;
  isLoading?: boolean;
}
export const CallNowSection: React.FC<CallNowSectionProps> = ({
  onStartPreCallIntel,
  onStartCall,
  isLoading = false
}) => {
  return <div className="space-y-6">
      {/* Enhanced Careco AI Features Highlight */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-purple-900">AI-Enhanced Calling</h3>
          <Badge className="bg-purple-100 text-purple-800 border-purple-200">
            <Sparkles className="w-3 h-3 mr-1" />
            Full AI Suite
          </Badge>
        </div>
        <p className="text-purple-800 mb-4">
          Complete AI-powered calling experience with pre-call intelligence, real-time assistance, and comprehensive post-call documentation.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-purple-800">Pre-call intelligence</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-blue-800">Real-time transcription</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-800">Source citations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-orange-800">EHR integration</span>
          </div>
        </div>
      </div>

      {/* Enhanced Call Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Avg Call Time</p>
              <p className="text-lg font-semibold">12 min</p>
              <p className="text-xs text-green-600">↓ 30% with Careco AI</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">AI Intelligence</p>
              <p className="text-lg font-semibold">Ready</p>
              <p className="text-xs text-purple-600 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                4 insights available
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-lg font-semibold">96%</p>
              <p className="text-xs text-green-600">Task completion rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Call Actions */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="space-y-4">
          <Button className="w-full mb-2 bg-purple-600 hover:bg-purple-700 h-12 text-lg relative z-10" onClick={onStartPreCallIntel} disabled={isLoading}>
            <Brain className="mr-2" size={20} />
            {isLoading ? 'Starting...' : 'Start with AI Pre-Call Intelligence'}
            <Badge className="ml-2 bg-purple-500 text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              Recommended
            </Badge>
          </Button>
          
          <Button className="w-full bg-[#1E4D36] hover:bg-[#2A6349] h-12 text-lg relative z-10" onClick={onStartCall} variant="outline" disabled={isLoading}>
            <PhoneCall className="mr-2" size={20} />
            {isLoading ? 'Starting...' : 'Direct Call (Skip Intelligence)'}
          </Button>
        </div>
        
        <p className="text-sm text-blue-700 text-center mt-4">
          Get AI-powered insights about the patient and task before your call, or jump straight into the enhanced calling interface.
        </p>
      </div>

      {/* Careco Features Showcase */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-800">Pre-Call Intelligence</span>
          </div>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Task-specific patient insights</li>
            <li>• Medication alerts & changes</li>
            <li>• Behavioral pattern analysis</li>
            <li>• Suggested conversation topics</li>
          </ul>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <PhoneCall className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-800">Live Call Assistant</span>
          </div>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Real-time transcription</li>
            <li>• AI conversation guidance</li>
            <li>• Automatic note-taking</li>
            <li>• Task progress tracking</li>
          </ul>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">Post-Call Documentation</span>
          </div>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Automatic SOAP notes</li>
            <li>• Source citations & evidence</li>
            <li>• Call quality analytics</li>
            <li>• EHR integration ready</li>
          </ul>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-orange-600" />
            <span className="font-medium text-orange-800">Task Integration</span>
          </div>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Automatic task updates</li>
            <li>• Follow-up scheduling</li>
            <li>• Outcome documentation</li>
            <li>• Care plan integration</li>
          </ul>
        </div>
      </div>
    </div>;
};