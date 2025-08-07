import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { usePortfolioData } from '../hooks/useLocalData';

const AcademicStatic = () => {
  const { data, loading } = usePortfolioData();

  if (loading) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p>Loading academic background...</p>
        </div>
      </div>
    );
  }

  const { academic } = data;

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <GraduationCap className="w-4 h-4 mr-2" />
            Academic Journey
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Academic Background
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            My educational journey through prestigious institutions, building a strong foundation 
            for research and professional excellence.
          </p>
        </div>

        {/* Academic Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-px bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 h-full"></div>

          <div className="space-y-12">
            {academic.map((degree, index) => (
              <div 
                key={degree.id} 
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg z-10">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-1/2 ml-16 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
                }`}>
                  <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {degree.year}
                        </Badge>
                        {degree.gpa && (
                          <div className="flex items-center text-sm text-slate-600">
                            <Award className="w-3 h-3 mr-1" />
                            GPA: {degree.gpa}
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-xl text-slate-900">
                        {degree.degree}
                      </CardTitle>
                      <p className="text-blue-600 font-medium">{degree.field}</p>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex items-center text-slate-600 mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="font-medium">{degree.institution}</span>
                      </div>
                      
                      <p className="text-slate-700 leading-relaxed mb-6">
                        {degree.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-slate-500 text-sm">
                          <Calendar className="w-3 h-3 mr-1" />
                          {degree.year}
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Competencies */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Academic Competencies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🔬</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Research Methods</h3>
                <p className="text-slate-600">
                  Quantitative & qualitative research methodologies, statistical analysis, and data interpretation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Data Analysis</h3>
                <p className="text-slate-600">
                  Advanced statistical software, data visualization, and analytical thinking.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">✍️</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Academic Writing</h3>
                <p className="text-slate-600">
                  Scholarly publication, grant writing, and academic communication.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Teaching</h3>
                <p className="text-slate-600">
                  Curriculum development, student mentorship, and educational leadership.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🌐</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Collaboration</h3>
                <p className="text-slate-600">
                  Cross-disciplinary teamwork, international research partnerships.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Leadership</h3>
                <p className="text-slate-600">
                  Project management, team coordination, and academic administration.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Academic Philosophy */}
        <div className="mt-20 bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Academic Philosophy
            </h2>
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-lg text-slate-700 leading-relaxed italic mb-6">
                "Education is not just about acquiring knowledge; it's about developing critical thinking, 
                fostering innovation, and contributing to the betterment of society through rigorous research 
                and thoughtful application of learning."
              </blockquote>
              <p className="text-slate-600 leading-relaxed">
                My academic journey has been driven by curiosity and a commitment to excellence. 
                I believe in the power of interdisciplinary collaboration, the importance of 
                evidence-based research, and the responsibility to translate academic insights 
                into practical solutions that benefit our communities and advance our understanding 
                of the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicStatic;