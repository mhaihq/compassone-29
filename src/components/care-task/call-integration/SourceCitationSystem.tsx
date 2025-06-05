
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Quote, Clock, ExternalLink, Search, Download } from 'lucide-react';

interface Citation {
  id: string;
  timestamp: string;
  patientQuote: string;
  clinicianResponse: string;
  context: string;
  evidenceType: 'verbal' | 'behavioral' | 'clinical_observation';
  relevantInsight: string;
  confidence: number;
}

interface SourceCitationSystemProps {
  citations: Citation[];
  callDuration: string;
}

export const SourceCitationSystem: React.FC<SourceCitationSystemProps> = ({
  citations,
  callDuration
}) => {
  const getEvidenceColor = (type: string) => {
    switch (type) {
      case 'verbal': return 'bg-blue-100 text-blue-800';
      case 'behavioral': return 'bg-green-100 text-green-800';
      case 'clinical_observation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportCitations = () => {
    // Mock export functionality
    console.log('Exporting citations for EHR integration');
  };

  return (
    <Card className="border-l-4 border-l-indigo-500">
      <CardHeader className="bg-indigo-50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Quote className="w-5 h-5 text-indigo-600" />
              Source Citations & Evidence
            </CardTitle>
            <p className="text-sm text-indigo-700">
              AI-extracted and verified conversation evidence with timestamps
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportCitations}>
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
            <Badge variant="outline">
              <Clock className="w-3 h-3 mr-1" />
              {callDuration}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Citation Statistics */}
        <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">{citations.length}</p>
            <p className="text-sm text-gray-600">Total Citations</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-blue-600">
              {citations.filter(c => c.evidenceType === 'verbal').length}
            </p>
            <p className="text-sm text-gray-600">Verbal Evidence</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-green-600">
              {Math.round(citations.reduce((acc, c) => acc + c.confidence, 0) / citations.length * 100)}%
            </p>
            <p className="text-sm text-gray-600">Avg Confidence</p>
          </div>
        </div>

        {/* Citations List */}
        <div className="space-y-4">
          {citations.map((citation) => (
            <Card key={citation.id} className="border border-gray-200">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {citation.timestamp}
                    </Badge>
                    <Badge className={getEvidenceColor(citation.evidenceType)}>
                      {citation.evidenceType.replace('_', ' ')}
                    </Badge>
                  </div>
                  <span className="text-xs text-gray-500">
                    {Math.round(citation.confidence * 100)}% confidence
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                    <div className="flex items-center gap-2 mb-1">
                      <Quote className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Patient:</span>
                    </div>
                    <p className="text-sm italic text-blue-800">"{citation.patientQuote}"</p>
                  </div>

                  {citation.clinicianResponse && (
                    <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-900">Clinician Response:</span>
                      </div>
                      <p className="text-sm text-green-800">{citation.clinicianResponse}</p>
                    </div>
                  )}
                </div>

                <div className="bg-purple-50 p-3 rounded-lg">
                  <h5 className="text-sm font-medium text-purple-900 mb-1">Clinical Context</h5>
                  <p className="text-sm text-purple-800">{citation.context}</p>
                  {citation.relevantInsight && (
                    <div className="mt-2 pt-2 border-t border-purple-200">
                      <span className="text-xs font-medium text-purple-700">Related Insight:</span>
                      <p className="text-xs text-purple-600">{citation.relevantInsight}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Search className="w-3 h-3 mr-1" />
                    Find Similar
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Add to EHR
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Export Options */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">Export & Integration Options</h4>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" onClick={exportCitations}>
              <FileText className="w-4 h-4 mr-2" />
              Export to PDF
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Send to EHR
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
