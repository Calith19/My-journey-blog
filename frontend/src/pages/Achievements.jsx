import React, { useState } from 'react';
import { Award, Trophy, BookOpen, Users, Calendar, ExternalLink, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { mockData } from '../mock/data';

const Achievements = () => {
  const { achievements } = mockData;
  const [selectedType, setSelectedType] = useState('all');

  const types = ['all', ...new Set(achievements.map(achievement => achievement.type))];

  const filteredAchievements = selectedType === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.type === selectedType);

  const getTypeIcon = (type) => {
    const icons = {
      'certification': BookOpen,
      'award': Trophy,
      'publication': BookOpen,
      'leadership': Users
    };
    return icons[type] || Award;
  };

  const getTypeColor = (type) => {
    const colors = {
      'certification': 'bg-blue-100 text-blue-800',
      'award': 'bg-yellow-100 text-yellow-800',
      'publication': 'bg-green-100 text-green-800',
      'leadership': 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getTypeLabel = (type) => {
    const labels = {
      'certification': 'Certification',
      'award': 'Award',
      'publication': 'Publication',
      'leadership': 'Leadership'
    };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium mb-4">
            <Trophy className="w-4 h-4 mr-2" />
            Excellence & Recognition
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Certifications & Achievements
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            A showcase of professional certifications, academic awards, research publications, 
            and leadership accomplishments that demonstrate commitment to excellence.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm border border-slate-200 p-1">
            <Filter className="w-4 h-4 text-slate-500 ml-2" />
            {types.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedType(type)}
                className={`capitalize transition-all duration-200 ${
                  selectedType === type 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm' 
                    : 'hover:bg-slate-100'
                }`}
              >
                {type === 'all' ? 'All' : getTypeLabel(type)}
              </Button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredAchievements.map((achievement) => {
            const Icon = getTypeIcon(achievement.type);
            return (
              <Card key={achievement.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-purple-200 transition-colors">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <Badge className={getTypeColor(achievement.type)}>
                          {getTypeLabel(achievement.type)}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center text-slate-500 text-sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      {achievement.date}
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
                    {achievement.title}
                  </CardTitle>
                  <p className="text-blue-600 font-medium text-sm">
                    {achievement.issuer}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-slate-700 leading-relaxed mb-6">
                    {achievement.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-500">
                      {achievement.type === 'publication' ? 'Published' : 'Received'}: {achievement.date}
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Achievement Statistics
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {achievements.filter(a => a.type === 'certification').length}
              </div>
              <div className="text-slate-600 text-sm">Certifications</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-2xl flex items-center justify-center">
                <Trophy className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {achievements.filter(a => a.type === 'award').length}
              </div>
              <div className="text-slate-600 text-sm">Awards</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {achievements.filter(a => a.type === 'publication').length}
              </div>
              <div className="text-slate-600 text-sm">Publications</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {achievements.filter(a => a.type === 'leadership').length}
              </div>
              <div className="text-slate-600 text-sm">Leadership</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-3xl p-12 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Interested in Collaboration?
            </h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              I'm always open to new opportunities for research collaboration, 
              academic partnerships, and professional development initiatives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Award className="w-4 h-4 mr-2" />
                View Full CV
              </Button>
              <Button variant="outline" size="lg" className="border-slate-300 hover:bg-slate-100">
                <ExternalLink className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;