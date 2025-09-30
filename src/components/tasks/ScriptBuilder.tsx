import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, MessageSquare } from 'lucide-react';

interface Script {
  id: string;
  title: string;
  description: string;
}

interface ScriptCombination {
  id: string;
  label: string;
  scripts: string[];
  description: string;
}

interface ScriptBuilderProps {
  scripts: Script[];
  combinations: ScriptCombination[];
  selectedScripts: string[];
  onScriptToggle: (scriptId: string, checked: boolean) => void;
  preview?: React.ReactNode;
}

export const ScriptBuilder: React.FC<ScriptBuilderProps> = ({
  scripts,
  combinations,
  selectedScripts,
  onScriptToggle,
  preview
}) => {
  const [customScript, setCustomScript] = React.useState('');

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            <h4 className="font-medium text-foreground">Script Builder</h4>
          </div>
          <Badge variant="outline" className="text-primary">
            {selectedScripts.length} Selected
          </Badge>
        </div>
        
        <div>
          <h5 className="text-sm font-medium text-foreground mb-3">Available Scripts</h5>
          <div className="grid grid-cols-2 gap-3">
            {scripts.map((script) => (
              <div key={script.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                <Checkbox 
                  id={script.id}
                  checked={selectedScripts.includes(script.id)}
                  onCheckedChange={(checked) => onScriptToggle(script.id, checked === true)}
                />
                <div className="flex-1">
                  <label htmlFor={script.id} className="text-sm font-medium text-foreground cursor-pointer block">
                    {script.title}
                  </label>
                  <p className="text-xs text-muted-foreground">{script.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h5 className="text-sm font-medium text-foreground mb-2">Suggested Combinations</h5>
          <div className="flex gap-2 flex-wrap">
            {combinations.map((combo) => (
              <Button 
                key={combo.id}
                variant="outline" 
                size="sm"
                onClick={() => {
                  combo.scripts.forEach(scriptId => {
                    if (!selectedScripts.includes(scriptId)) {
                      onScriptToggle(scriptId, true);
                    }
                  });
                }}
                className="text-xs"
                title={combo.description}
              >
                {combo.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Input 
            placeholder="Add custom script..."
            value={customScript}
            onChange={(e) => setCustomScript(e.target.value)}
            className="flex-1"
          />
          <Button 
            size="sm"
            onClick={() => {
              if (customScript.trim()) {
                // Handle custom script
                setCustomScript('');
              }
            }}
            disabled={!customScript.trim()}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        {preview && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <h5 className="text-sm font-medium text-foreground mb-2">Preview</h5>
            {preview}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
