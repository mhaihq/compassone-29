
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Users, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { PatientSummary } from '@/data/patientsData';
import { 
  transformPatientsToMapPoints, 
  createClusterData, 
  getSeverityColor,
  PatientMapPoint,
  ClusterPoint 
} from '@/utils/patientMapUtils';

interface PatientPopulationMapProps {
  patients: PatientSummary[];
  onPatientSelect?: (patientId: string) => void;
  searchTerm?: string;
  severityFilter?: string;
}

export const PatientPopulationMap: React.FC<PatientPopulationMapProps> = ({
  patients,
  onPatientSelect,
  searchTerm = '',
  severityFilter = 'all'
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedCluster, setSelectedCluster] = useState<ClusterPoint | null>(null);
  const [zoom, setZoom] = useState(1);
  
  const width = 320;
  const height = 180;
  const clusterRadius = 20;

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    // Filter patients based on search and severity
    const filteredPatients = patients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           patient.primaryDiagnosis.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSeverity = severityFilter === 'all' || patient.severity === severityFilter;
      
      return matchesSearch && matchesSeverity;
    });

    // Transform patient data to map points
    const mapPoints = transformPatientsToMapPoints(filteredPatients);
    
    // Create cluster data
    const clusterData = createClusterData(mapPoints, width, height, clusterRadius);

    // Create main group with zoom transform
    const g = svg.append('g')
      .attr('transform', `scale(${zoom})`);

    // Draw clusters as circles
    const clusters = g.selectAll('.cluster')
      .data(clusterData)
      .enter()
      .append('g')
      .attr('class', 'cluster')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    // Add cluster circles
    clusters.append('circle')
      .attr('r', d => Math.max(8, Math.min(16, 6 + d.count * 2)))
      .attr('fill', d => getSeverityColor(d.severity))
      .attr('fill-opacity', d => Math.min(0.4 + (d.count * 0.15), 0.8))
      .attr('stroke', d => getSeverityColor(d.severity))
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.9)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .attr('stroke-width', 3)
          .attr('fill-opacity', 0.9);
        setSelectedCluster(d);
      })
      .on('mouseout', function(event, d) {
        d3.select(this)
          .attr('stroke-width', 2)
          .attr('fill-opacity', Math.min(0.4 + (d.count * 0.15), 0.8));
        setSelectedCluster(null);
      })
      .on('click', function(event, d) {
        if (onPatientSelect && d.patients.length > 0) {
          onPatientSelect(d.patients[0].id);
        }
      });

    // Add count labels for clusters with multiple patients
    clusters.filter(d => d.count > 1)
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('fill', 'white')
      .text(d => d.count);

  }, [patients, searchTerm, severityFilter, zoom]);

  const handleZoomIn = () => setZoom(Math.min(zoom * 1.2, 3));
  const handleZoomOut = () => setZoom(Math.max(zoom / 1.2, 0.5));
  const handleResetZoom = () => setZoom(1);

  return (
    <TooltipProvider>
      <div className="bg-white border rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-[#1E4D36]" />
            <h3 className="text-sm font-semibold text-[#1E4D36]">Aligned Patient Map</h3>
            <Badge variant="outline" className="text-xs">
              {patients.length} patients
            </Badge>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={handleZoomIn}
            >
              <ZoomIn size={12} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={handleZoomOut}
            >
              <ZoomOut size={12} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={handleResetZoom}
            >
              <RotateCcw size={12} />
            </Button>
          </div>
        </div>

        <div className="relative">
          <svg
            ref={svgRef}
            width={width}
            height={height}
            className="border border-gray-200 rounded bg-gray-50"
            style={{ overflow: 'hidden' }}
          />
          
          {selectedCluster && (
            <Tooltip open={!!selectedCluster}>
              <TooltipTrigger asChild>
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <div className="space-y-2">
                  <div className="font-medium">{selectedCluster.name}</div>
                  <div className="text-xs space-y-1">
                    <div>ID: {selectedCluster.id}</div>
                    <div>Age: {selectedCluster.age}y</div>
                    <div>Severity: {selectedCluster.severity}</div>
                    <div>Diagnosis: {selectedCluster.primaryDiagnosis}</div>
                    {selectedCluster.count > 1 && (
                      <div className="text-blue-600">
                        +{selectedCluster.count - 1} other patients in this area
                      </div>
                    )}
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getSeverityColor('Severe') }}></div>
              <span>High Risk</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getSeverityColor('Moderate') }}></div>
              <span>Medium Risk</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getSeverityColor('Mild') }}></div>
              <span>Low Risk</span>
            </div>
          </div>
          <div className="text-gray-500">
            Click circles to view patients
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
