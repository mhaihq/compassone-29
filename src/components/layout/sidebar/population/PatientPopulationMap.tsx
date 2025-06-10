
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
  const hexRadius = 6; // Smaller radius for more dense grid
  const margin = { top: 20, right: 40, bottom: 30, left: 50 };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Filter patients based on search and severity
    const filteredPatients = patients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           patient.primaryDiagnosis.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSeverity = severityFilter === 'all' || patient.severity === severityFilter;
      
      return matchesSearch && matchesSeverity;
    });

    // Transform patient data to grid-based map points
    const mapPoints = transformPatientsToMapPoints(filteredPatients);
    
    // Create hexagon data with grid positions
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    const hexbinData = createHexbinData(mapPoints, plotWidth, plotHeight, hexRadius);

    // Create main group with zoom and translation
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top}) scale(${zoom})`);

    // Draw grid lines (optional, for visualization)
    const cols = Math.max(...mapPoints.map(p => p.gridCol)) + 1;
    const rows = Math.max(...mapPoints.map(p => p.gridRow)) + 1;
    const cellWidth = plotWidth / Math.max(cols - 1, 1);
    const cellHeight = plotHeight / Math.max(rows - 1, 1);

    // Add subtle grid lines
    const gridGroup = g.append('g').attr('class', 'grid').style('opacity', 0.1);
    
    // Vertical lines
    for (let i = 0; i <= cols; i++) {
      gridGroup.append('line')
        .attr('x1', i * cellWidth)
        .attr('y1', 0)
        .attr('x2', i * cellWidth)
        .attr('y2', plotHeight)
        .attr('stroke', '#999')
        .attr('stroke-width', 0.5);
    }
    
    // Horizontal lines
    for (let i = 0; i <= rows; i++) {
      gridGroup.append('line')
        .attr('x1', 0)
        .attr('y1', i * cellHeight)
        .attr('x2', plotWidth)
        .attr('y2', i * cellHeight)
        .attr('stroke', '#999')
        .attr('stroke-width', 0.5);
    }

    // Add Y-axis label (Risk Level)
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 15)
      .attr('x', -(height / 2))
      .style('text-anchor', 'middle')
      .style('font-size', '10px')
      .style('fill', '#6b7280')
      .text('Risk Level');

    // Add X-axis label (Patient Distribution)
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 5)
      .style('text-anchor', 'middle')
      .style('font-size', '10px')
      .style('fill', '#6b7280')
      .text('Patient Grid');

    // Add risk level indicators on Y-axis
    const riskLabels = [
      { text: 'High', y: margin.top + 20, color: '#dc2626' },
      { text: 'Med', y: height / 2, color: '#d97706' },
      { text: 'Low', y: height - margin.bottom - 20, color: '#16a34a' }
    ];

    riskLabels.forEach(label => {
      svg.append('text')
        .attr('x', 8)
        .attr('y', label.y)
        .style('text-anchor', 'middle')
        .style('font-size', '9px')
        .style('fill', label.color)
        .style('font-weight', 'bold')
        .text(label.text);
    });

    // Draw hexagons in grid cells
    const hexagons = g.selectAll('.hexagon')
      .data(hexbinData)
      .enter()
      .append('g')
      .attr('class', 'hexagon')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    // Create hexagon path
    const hexPath = d3.geoPath(d3.geoIdentity());
    const hexagonPath = hexPath({
      type: 'Polygon',
      coordinates: [[
        [-hexRadius * 0.866, -hexRadius * 0.5],
        [0, -hexRadius],
        [hexRadius * 0.866, -hexRadius * 0.5],
        [hexRadius * 0.866, hexRadius * 0.5],
        [0, hexRadius],
        [-hexRadius * 0.866, hexRadius * 0.5],
        [-hexRadius * 0.866, -hexRadius * 0.5]
      ]]
    });

    hexagons.append('path')
      .attr('d', hexagonPath)
      .attr('fill', d => getSeverityColor(d.severity))
      .attr('fill-opacity', 0.8)
      .attr('stroke', d => getSeverityColor(d.severity))
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 1)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .attr('stroke-width', 2)
          .attr('fill-opacity', 1)
          .attr('transform', 'scale(1.1)'); // Slight hover effect
        setSelectedHex(d);
      })
      .on('mouseout', function(event, d) {
        d3.select(this)
          .attr('stroke-width', 1)
          .attr('fill-opacity', 0.8)
          .attr('transform', 'scale(1)');
        setSelectedHex(null);
      })
      .on('click', function(event, d) {
        if (onPatientSelect) {
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
            <h3 className="text-sm font-semibold text-[#1E4D36]">Patient Population Grid</h3>
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
          
          {selectedHex && (
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
                    <div>Grid: ({selectedHex.gridCol}, {selectedHex.gridRow})</div>
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
              <span>High Risk (Top)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: getSeverityColor('Moderate') }}></div>
              <span>Medium Risk (Middle)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: getSeverityColor('Mild') }}></div>
              <span>Low Risk (Bottom)</span>
            </div>
          </div>
          <div className="text-gray-500">
            Grid-based layout
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
