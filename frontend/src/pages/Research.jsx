import React, { useState } from 'react';
import { FlaskConical, Calendar, Users, ExternalLink, Clock, CheckCircle, PlayCircle, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { mockData } from '../mock/data';

const Research = () => {
  const { research } = mockData;
  const [selectedStatus, setSelectedStatus] = useState('all');

  const statuses = ['all', ...new Set(research.map(project => project.status))];

  const filteredResearch = selectedStatus === 'all' 
    ? research 
    : research.filter(project => project.status === selectedStatus);

  const getStatusIcon = (status) => {
    const icons = {
      'Completed': CheckCircle,
      'In Progress': PlayCircle,
      'Planning': Clock
    };
    return icons[status] || Clock;
  };

  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'bg-green-100 text-green-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Planning': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getProgressValue = (status) => {
    const values = {
      'Completed': 100,
      'In Progress': 65,
      'Planning': 25
    };
    return values[status] || 0;
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4">
            <FlaskConical className="w-4 h-4 mr-2" />
            Research & Innovation
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Research Projects
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Exploring cutting-edge research questions through rigorous methodology, 
            collaborative partnerships, and innovative approaches to advance knowledge in my field.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm border border-slate-200 p-1">
            <Filter className="w-4 h-4 text-slate-500 ml-2" />
            {statuses.map((status) => (
              <Button
                key={status}
                variant={selectedStatus === status ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedStatus(status)}
                className={`capitalize transition-all duration-200 ${
                  selectedStatus === status 
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm' 
                    : 'hover:bg-slate-100'
                }`}
              >
                {status === 'all' ? 'All Projects' : status}
              </Button>
            ))}
          </div>
        </div>

        {/* Research Projects */}
        <div className="space-y-8 mb-16">
          {filteredResearch.map((project, index) => {
            const StatusIcon = getStatusIcon(project.status);
            return (
              <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-green-500 to-blue-600"></div>
                <CardHeader className="pb-4">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(project.status)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {project.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {project.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl text-slate-900 group-hover:text-green-600 transition-colors">
                        {project.title}
                      </CardTitle>
                    </div>
                    
                    <div className="flex items-center text-slate-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{project.duration}</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Progress</span>
                      <span className="text-sm font-medium text-slate-900">{getProgressValue(project.status)}%</span>
                    </div>
                    <Progress value={getProgressValue(project.status)} className="h-2" />
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Description */}
                    <div className="lg:col-span-2 space-y-4">
                      <p className="text-slate-700 leading-relaxed">
                        {project.description}
                      </p>
                      
                      {/* Technologies */}
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Technologies & Methods:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Outcomes */}
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Outcomes & Impact:</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {project.outcomes}
                        </p>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                      {/* Collaborators */}
                      <div className="bg-slate-50 rounded-lg p-4">
                        <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          Collaborators
                        </h4>
                        <div className="space-y-2">
                          {project.collaborators.map((collaborator, collabIndex) => (
                            <div key={collabIndex} className="text-sm text-slate-600 flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              {collaborator}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <ExternalLink className="w-3 h-3 mr-2" />
                          View Publication
                        </Button>
                        {project.status === 'In Progress' && (
                          <Button variant="ghost" size="sm" className="w-full justify-start text-blue-600">
                            <Clock className="w-3 h-3 mr-2" />
                            Follow Progress
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Research Areas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Research Areas & Expertise
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🧬', title: 'Methodology Development', desc: 'Creating new research frameworks and analytical approaches' },
              { icon: '📊', title: 'Data Analysis', desc: 'Advanced statistical modeling and data interpretation' },
              { icon: '🔬', title: 'Experimental Design', desc: 'Systematic investigation and controlled studies' },
              { icon: '🌐', title: 'Interdisciplinary Research', desc: 'Cross-field collaboration and integration' },
              { icon: '💡', title: 'Innovation Studies', desc: 'Technology transfer and practical applications' },
              { icon: '📚', title: 'Literature Review', desc: 'Systematic reviews and meta-analyses' }
            ].map((area, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{area.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{area.title}</h3>
                  <p className="text-slate-600 text-sm">{area.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-12">
            <FlaskConical className="w-16 h-16 mx-auto mb-6 text-green-600" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Interested in Research Collaboration?
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new research opportunities, collaborative projects, 
              and innovative approaches to advancing knowledge in our field.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <FlaskConical className="w-4 h-4 mr-2" />
                Discuss Research
              </Button>
              <Button variant="outline" size="lg" className="border-slate-300 hover:bg-slate-100">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Publications
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;