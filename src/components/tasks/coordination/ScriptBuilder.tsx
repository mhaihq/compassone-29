import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FileText, Phone, Mail } from 'lucide-react';

interface ScriptTemplate {
  id: string;
  name: string;
  type: 'call' | 'sms' | 'email';
  content: string;
}

interface ScriptBuilderProps {
  templates: ScriptTemplate[];
  selectedTemplate: string | null;
  onSelectTemplate: (id: string) => void;
  customScript: string;
  onScriptChange: (script: string) => void;
}

export const ScriptBuilder: React.FC<ScriptBuilderProps> = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
  customScript,
  onScriptChange
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'sms': return <FileText className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card className="p-4">
      <Label className="text-sm font-semibold mb-3 block">Script Builder</Label>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {templates.map((template) => (
            <Button
              key={template.id}
              variant={selectedTemplate === template.id ? "default" : "outline"}
              className="justify-start"
              onClick={() => onSelectTemplate(template.id)}
            >
              {getIcon(template.type)}
              <span className="ml-2">{template.name}</span>
            </Button>
          ))}
        </div>
        
        <div>
          <Label className="text-xs text-muted-foreground mb-2 block">
            Preview & Customize
          </Label>
          <Textarea
            value={customScript}
            onChange={(e) => onScriptChange(e.target.value)}
            placeholder="Select a template or write your own script..."
            className="min-h-[120px]"
          />
        </div>
      </div>
    </Card>
  );
};
