
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Users, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { PatientSummary } from '@/data/patientsData';
import { 
  transformPatientsToMapPoints, 
  createHexbinData, 
  getSeverityColor,
  PatientMapPoint,
  HexbinPoint 
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
  const [selectedHex, setSelectedHex] = useState<HexbinPoint | null>(null);
  const [zoom, setZoom] = useState(1);
  
  const width = 400;
  const height = 240;
  const hexRadius = 8; // Much smaller radius for tripled density

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
    
    // Create tripled density hexagons
    const hexbinData = createHexbinData(mapPoints, width, height, hexRadius);

    // Create main group with zoom transform
    const g = svg.append('g')
      .attr('transform', `scale(${zoom})`);

    // Draw hexagons - much more dense grid
    const hexagons = g.selectAll('.hexagon')
      .data(hexbinData)
      .enter()
      .append('g')
      .attr('class', 'hexagon')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    // Create hexagon path using d3.geoPath with smaller radius
    const adjustedHexRadius = hexRadius * 0.4; // Match the adjusted radius from utils
    const hexPath = d3.geoPath(d3.geoIdentity());
    const hexagonPath = hexPath({
      type: 'Polygon',
      coordinates: [[
        [-adjustedHexRadius * 0.866, -adjustedHexRadius * 0.5],
        [0, -adjustedHexRadius],
        [adjustedHexRadius * 0.866, -adjustedHexRadius * 0.5],
        [adjustedHexRadius * 0.866, adjustedHexRadius * 0.5],
        [0, adjustedHexRadius],
        [-adjustedHexRadius * 0.866, adjustedHexRadius * 0.5],
        [-adjustedHexRadius * 0.866, -adjustedHexRadius * 0.5]
      ]]
    });

    hexagons.append('path')
      .attr('d', hexagonPath)
      .attr('fill', d => getSeverityColor(d.severity))
      .attr('fill-opacity', 0.7)
      .attr('stroke', d => getSeverityColor(d.severity))
      .attr('stroke-width', 0.5)
      .attr('stroke-opacity', 0.9)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .attr('stroke-width', 1)
          .attr('fill-opacity', 0.9);
        setSelectedHex(d);
      })
      .on('mouseout', function(event, d) {
        d3.select(this)
          .attr('stroke-width', 0.5)
          .attr('fill-opacity', 0.7);
        setSelectedHex(null);
      })
      .on('click', function(event, d) {
        if (onPatientSelect && !d.id.startsWith('synthetic-')) {
          onPatientSelect(d.id);
        }
      });

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
            className="border border-gray-200 rounded bg-gray-50 w-full"
            style={{ overflow: 'hidden' }}
          />
          
          {selectedHex && !selectedHex.id.startsWith('synthetic-') && (
            <Tooltip open={!!selectedHex}>
              <TooltipTrigger asChild>
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <div className="space-y-2">
                  <div className="font-medium">{selectedHex.name}</div>
                  <div className="text-xs space-y-1">
                    <div>ID: {selectedHex.id}</div>
                    <div>Age: {selectedHex.age}y</div>
                    <div>Severity: {selectedHex.severity}</div>
                    <div>Diagnosis: {selectedHex.primaryDiagnosis}</div>
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
              <div className="w-3 h-3 rounded" style={{ backgroundColor: getSeverityColor('Severe') }}></div>
              <span>High Risk</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: getSeverityColor('Moderate') }}></div>
              <span>Medium Risk</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: getSeverityColor('Mild') }}></div>
              <span>Low Risk</span>
            </div>
          </div>
          <div className="text-gray-500">
            Each hexagon represents one patient
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
