
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Users, ZoomIn, ZoomOut, RotateCcw, Grid2X2 } from 'lucide-react';
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
  
  const width = 420;
  const height = 280;
  const hexRadius = 4; // Smaller hexagons for denser grid
  const margin = { top: 25, right: 45, bottom: 35, left: 55 };

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
    
    // Create hexagon data with optimized spacing
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    const hexbinData = createHexbinData(mapPoints, plotWidth, plotHeight, hexRadius);

    // Create main group with zoom and translation
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top}) scale(${zoom})`);

    // Calculate grid parameters for visualization
    const cols = Math.max(...mapPoints.map(p => p.gridCol)) + 1;
    const rows = Math.max(...mapPoints.map(p => p.gridRow)) + 1;
    const cellWidth = plotWidth / Math.max(cols - 1, 1);
    const cellHeight = plotHeight / Math.max(rows - 1, 1);

    // Add subtle grid lines for reference
    const gridGroup = g.append('g').attr('class', 'grid').style('opacity', 0.08);
    
    // Vertical grid lines
    for (let i = 0; i <= cols; i++) {
      gridGroup.append('line')
        .attr('x1', i * cellWidth)
        .attr('y1', 0)
        .attr('x2', i * cellWidth)
        .attr('y2', plotHeight)
        .attr('stroke', '#999')
        .attr('stroke-width', 0.5);
    }
    
    // Horizontal grid lines  
    for (let i = 0; i <= rows; i++) {
      gridGroup.append('line')
        .attr('x1', 0)
        .attr('y1', i * cellHeight)
        .attr('x2', plotWidth)
        .attr('y2', i * cellHeight)
        .attr('stroke', '#999')
        .attr('stroke-width', 0.5);
    }

    // Add axis labels
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 15)
      .attr('x', -(height / 2))
      .style('text-anchor', 'middle')
      .style('font-size', '11px')
      .style('fill', '#6b7280')
      .style('font-weight', '500')
      .text('Risk Level');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 8)
      .style('text-anchor', 'middle')
      .style('font-size', '11px')
      .style('fill', '#6b7280')
      .style('font-weight', '500')
      .text('Patient Grid Distribution');

    // Add risk level indicators
    const riskLabels = [
      { text: 'HIGH', y: margin.top + 15, color: '#dc2626' },
      { text: 'MED', y: height / 2, color: '#d97706' },
      { text: 'LOW', y: height - margin.bottom - 15, color: '#16a34a' }
    ];

    riskLabels.forEach(label => {
      svg.append('text')
        .attr('x', 12)
        .attr('y', label.y)
        .style('text-anchor', 'middle')
        .style('font-size', '8px')
        .style('fill', label.color)
        .style('font-weight', 'bold')
        .text(label.text);
    });

    // Draw hexagons
    const hexagons = g.selectAll('.hexagon')
      .data(hexbinData)
      .enter()
      .append('g')
      .attr('class', 'hexagon')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    // Create optimized hexagon path
    const adjustedRadius = Math.min(hexRadius, cellWidth / 3, cellHeight / 3);
    const hexPath = d3.geoPath(d3.geoIdentity());
    const hexagonPath = hexPath({
      type: 'Polygon',
      coordinates: [[
        [-adjustedRadius * 0.866, -adjustedRadius * 0.5],
        [0, -adjustedRadius],
        [adjustedRadius * 0.866, -adjustedRadius * 0.5],
        [adjustedRadius * 0.866, adjustedRadius * 0.5],
        [0, adjustedRadius],
        [-adjustedRadius * 0.866, adjustedRadius * 0.5],
        [-adjustedRadius * 0.866, -adjustedRadius * 0.5]
      ]]
    });

    hexagons.append('path')
      .attr('d', hexagonPath)
      .attr('fill', d => getSeverityColor(d.severity))
      .attr('fill-opacity', 0.85)
      .attr('stroke', d => getSeverityColor(d.severity))
      .attr('stroke-width', 0.8)
      .attr('stroke-opacity', 0.9)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .attr('stroke-width', 1.5)
          .attr('fill-opacity', 1)
          .attr('transform', 'scale(1.2)');
        setSelectedHex(d);
      })
      .on('mouseout', function(event, d) {
        d3.select(this)
          .attr('stroke-width', 0.8)
          .attr('fill-opacity', 0.85)
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
            <Grid2X2 size={16} className="text-[#1E4D36]" />
            <h3 className="text-sm font-semibold text-[#1E4D36]">Population Grid</h3>
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
                    <div>Risk: {selectedHex.severity}</div>
                    <div>Condition: {selectedHex.primaryDiagnosis}</div>
                    <div>Position: ({selectedHex.gridCol}, {selectedHex.gridRow})</div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getSeverityColor('Severe') }}></div>
              <span>High Risk</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getSeverityColor('Moderate') }}></div>
              <span>Medium Risk</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getSeverityColor('Mild') }}></div>
              <span>Low Risk</span>
            </div>
          </div>
          <div className="text-gray-500 text-xs">
            Dense grid layout
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
