import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  const [hoveredHex, setHoveredHex] = useState<HexbinPoint | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  
  const width = 400;
  const height = 240;
  const hexRadius = 3.5; // Smaller radius for maximum density

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

    // Transform patient data to map points
    const mapPoints = transformPatientsToMapPoints(filteredPatients);
    const hexbinData = createHexbinData(mapPoints, width, height, hexRadius);

    // Create main group with zoom transform
    const g = svg.append('g')
      .attr('transform', `scale(${zoom})`);

    // Draw hexagons
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
      .attr('fill', d => d.solidColor)
      .attr('fill-opacity', d => d.isRealPatient ? 0.9 : 0.4)
      .attr('stroke', d => d.solidColor)
      .attr('stroke-width', 0.3)
      .style('cursor', d => d.isRealPatient ? 'pointer' : 'default')
      .on('mouseover', function(event, d) {
        if (d.isRealPatient) {
          d3.select(this)
            .attr('stroke-width', 1.5)
            .attr('fill-opacity', 1)
            .attr('transform', 'scale(1.2)');
          
          setHoveredHex(d);
          const rect = svgRef.current?.getBoundingClientRect();
          if (rect) {
            setMousePosition({
              x: event.clientX - rect.left,
              y: event.clientY - rect.top
            });
          }
        }
      })
      .on('mouseout', function(event, d) {
        if (d.isRealPatient) {
          d3.select(this)
            .attr('stroke-width', 0.3)
            .attr('fill-opacity', 0.9)
            .attr('transform', 'scale(1)');
          
          setHoveredHex(null);
        }
      })
      .on('click', function(event, d) {
        if (d.isRealPatient && onPatientSelect) {
          onPatientSelect(d.id);
        }
      });

  }, [patients, searchTerm, severityFilter, zoom]);

  const handleZoomIn = () => setZoom(Math.min(zoom * 1.2, 3));
  const handleZoomOut = () => setZoom(Math.max(zoom / 1.2, 0.5));
  const handleResetZoom = () => setZoom(1);

  // Filter patients for correct count display
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.primaryDiagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = severityFilter === 'all' || patient.severity === severityFilter;
    
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="bg-white border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-[#1E4D36]" />
          <h3 className="text-sm font-semibold text-[#1E4D36]">Patient Population Map</h3>
          <Badge variant="outline" className="text-xs">
            {filteredPatients.length} patients
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
        
        {/* Hover tooltip */}
        {hoveredHex && (
          <div 
            className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 pointer-events-none min-w-[200px]"
            style={{
              left: mousePosition.x > width / 2 ? mousePosition.x - 210 : mousePosition.x + 10,
              top: mousePosition.y - 10,
              maxWidth: '250px'
            }}
          >
            <div className="space-y-2">
              <div className="font-medium text-sm text-gray-900">{hoveredHex.name}</div>
              <div className="text-xs space-y-1 text-gray-600">
                <div className="flex justify-between">
                  <span>ID:</span>
                  <span className="font-mono text-gray-800">{hoveredHex.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Age:</span>
                  <span className="text-gray-800">{hoveredHex.age} years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Risk Level:</span>
                  <div className="flex items-center gap-1">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: getSeverityColor(hoveredHex.severity) }}
                    />
                    <span className="font-medium text-gray-800">{hoveredHex.severity}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Diagnosis:</span>
                  <span className="text-gray-800 text-right">{hoveredHex.primaryDiagnosis}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Visit:</span>
                  <span className="text-gray-800">{new Date(hoveredHex.lastVisit).toLocaleDateString()}</span>
                </div>
              </div>
              {onPatientSelect && (
                <div className="text-xs text-blue-600 mt-2 font-medium">Click to view patient details</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#dc2626' }}></div>
            <span>High Risk</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#d97706' }}></div>
            <span>Medium Risk</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#059669' }}></div>
            <span>Low Risk</span>
          </div>
        </div>
        <div className="text-gray-500">
          Hover for patient details • Click to view
        </div>
      </div>
    </div>
  );
};
