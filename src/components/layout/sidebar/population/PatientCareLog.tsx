
import React, { useState } from 'react';
import { Calendar, Clock, Video, Phone, ChevronDown, ChevronUp, Edit, FileText, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const PatientCareLog: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  
  const toggleItem = (itemId: string) => {
    setActiveItem(activeItem === itemId ? null : itemId);
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Care Log</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative w-48">
              <Input 
                type="text"
                placeholder="Search logs..."
                className="pl-10 py-2 bg-white text-sm"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                  <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
            <div className="flex rounded-md border border-input overflow-hidden">
              <Button variant="ghost" className="px-3 py-1 text-sm rounded-none bg-blue-50 text-blue-700 border-r">All</Button>
              <Button variant="ghost" className="px-3 py-1 text-sm rounded-none">Future</Button>
              <Button variant="ghost" className="px-3 py-1 text-sm rounded-none">Past</Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Upcoming Calls Section */}
        <div className="mb-6">
          <div className="flex items-center text-gray-600 mb-3">
            <Calendar size={16} className="mr-2" />
            <h4 className="text-md font-medium">Upcoming Calls</h4>
          </div>

          {/* Medication Review */}
          <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-blue-600">
                  <Video size={20} />
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Medication Review</h5>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    <span>May 5 • 10:30 AM</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-50 text-blue-700">Scheduled</Badge>
                <Badge className="bg-teal-600 text-white">Dr. Smith</Badge>
                <Button variant="ghost" size="sm" className="p-1">
                  <ChevronDown size={20} />
                </Button>
              </div>
            </div>
          </div>

          {/* Mental Health Check-in */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-blue-600">
                  <Phone size={20} />
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Mental Health Check-in</h5>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    <span>May 7 • 2:15 PM</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-50 text-blue-700">Scheduled</Badge>
                <Badge className="bg-teal-600 text-white">AI Voice Coach</Badge>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-1"
                  onClick={() => toggleItem('mental-health')}
                >
                  {activeItem === 'mental-health' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </Button>
              </div>
            </div>

            {activeItem === 'mental-health' && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h6 className="text-blue-600 font-medium flex items-center">
                    <FileText size={16} className="mr-2" />
                    Call Script
                  </h6>
                  <Button variant="ghost" size="sm" className="text-gray-500 flex items-center">
                    <Edit size={16} className="mr-1" />
                    Edit Script
                  </Button>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Administer PHQ-9 assessment.</li>
                    <li>Ask about sleep quality and daily activities.</li>
                    <li>Check for any suicidal ideation.</li>
                    <li>Discuss coping mechanisms.</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h6 className="text-gray-700 font-medium mb-2">Related Tasks</h6>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-white p-3 rounded-md border border-gray-100">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
                        <span>PHQ-9 Assessment</span>
                      </div>
                      <span className="text-sm text-gray-500">high</span>
                    </div>
                    <div className="flex items-center justify-between bg-white p-3 rounded-md border border-gray-100">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                        <span>Sleep Quality Check</span>
                      </div>
                      <span className="text-sm text-gray-500">low</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Past Calls Section */}
        <div>
          <div className="flex items-center text-gray-600 mb-3">
            <Clock size={16} className="mr-2" />
            <h4 className="text-md font-medium">Past Calls</h4>
          </div>

          {/* Initial Assessment */}
          <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-green-600">
                  <Video size={20} />
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Initial Assessment</h5>
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>Apr 28 • 11:00 AM</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>24 min</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-50 text-green-700">Completed</Badge>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-1"
                  onClick={() => toggleItem('initial-assessment')}
                >
                  {activeItem === 'initial-assessment' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </Button>
              </div>
            </div>

            {activeItem === 'initial-assessment' && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h6 className="text-gray-700 font-medium mb-2">SOAP Notes</h6>
                
                <div className="space-y-4">
                  <div>
                    <h6 className="text-blue-600 text-sm font-medium mb-1">Subjective</h6>
                    <p className="text-gray-700">Patient reports dizziness after taking the new medication. Symptoms are worse in the morning.</p>
                  </div>
                  
                  <div>
                    <h6 className="text-green-600 text-sm font-medium mb-1">Objective</h6>
                    <p className="text-gray-700">BP: 130/85, HR: 76, Temp: 98.6F. Patient appears slightly pale.</p>
                  </div>
                  
                  <div>
                    <h6 className="text-amber-600 text-sm font-medium mb-1">Assessment</h6>
                    <p className="text-gray-700">Medication side effect - dizziness from antihypertensive medication.</p>
                  </div>
                  
                  <div>
                    <h6 className="text-purple-600 text-sm font-medium mb-1">Plan</h6>
                    <p className="text-gray-700">Reduce dosage by 50%. Follow up in 1 week. Patient to monitor BP daily.</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h6 className="text-gray-700 font-medium mb-2">Flags</h6>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-red-50 text-red-700 border border-red-200">Medication Side Effect</Badge>
                    <Badge className="bg-amber-50 text-amber-700 border border-amber-200">Requires Follow-up</Badge>
                  </div>
                </div>

                <div className="mt-4">
                  <h6 className="text-gray-700 font-medium mb-2">Summary</h6>
                  <p className="text-gray-700">Completed initial assessment. Patient reports medication side effects.</p>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <h6 className="text-gray-700 font-medium flex items-center">
                      <MessageCircle size={16} className="mr-2" />
                      Transcript
                    </h6>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
                          <path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V6H8.5C8.22386 6 8 5.77614 8 5.5V2H3.5ZM9 2.70711L11.2929 5H9V2.70711ZM2 2.5C2 1.67157 2.67157 1 3.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645L12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
                          <path d="M7.5 2C4.46243 2 2 4.46243 2 7.5C2 10.5376 4.46243 13 7.5 13C10.5376 13 13 10.5376 13 7.5C13 4.46243 10.5376 2 7.5 2ZM1 7.5C1 3.91015 3.91015 1 7.5 1C11.0899 1 14 3.91015 14 7.5C14 11.0899 11.0899 14 7.5 14C3.91015 14 1 11.0899 1 7.5ZM7.5 4C7.77614 4 8 4.22386 8 4.5V7H10.5C10.7761 7 11 7.22386 11 7.5C11 7.77614 10.7761 8 10.5 8H7.5C7.22386 8 7 7.77614 7 7.5V4.5C7 4.22386 7.22386 4 7.5 4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md mt-2 text-sm text-gray-700">
                    <p className="text-gray-500 mb-3">Transcript of 24 min call</p>
                    <div className="space-y-2">
                      <p><span className="font-medium">Dr:</span> How are you feeling today?</p>
                      <p><span className="font-medium">Patient:</span> I've been having some dizziness with the new medication.</p>
                      <p><span className="font-medium">Dr:</span> Let's discuss that and possibly adjust your dosage.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h6 className="text-gray-700 font-medium mb-2">Outcomes</h6>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Adjusted medication dosage</li>
                    <li>Scheduled follow-up in 1 week</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Medication Consultation */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-green-600">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Medication Consultation</h5>
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>Apr 15 • 10:00 AM</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>5 min</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-50 text-green-700">Completed</Badge>
                <Button variant="ghost" size="sm" className="p-1">
                  <ChevronDown size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
