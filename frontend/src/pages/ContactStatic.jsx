import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ExternalLink, Linkedin, Twitter, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import { usePortfolioData } from '../hooks/useLocalData';

const ContactStatic = () => {
  const { data, loading } = usePortfolioData();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'research', label: 'Research Collaboration' },
    { value: 'academic', label: 'Academic Discussion' },
    { value: 'speaking', label: 'Speaking Engagement' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission for static site
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Message sent successfully!",
      description: "Thank you for reaching out. I'll get back to you within 24-48 hours.",
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      type: 'general'
    });
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p>Loading contact information...</p>
        </div>
      </div>
    );
  }

  const { contact } = data;

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <Mail className="w-4 h-4 mr-2" />
            Let's Connect
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            I'd love to hear from admissions committees, potential collaborators, fellow researchers, 
            and anyone interested in academic discussions or professional opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Email</h3>
                      <a 
                        href={`mailto:${contact.email}`}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Phone</h3>
                      <a 
                        href={`tel:${contact.phone}`}
                        className="text-slate-600 hover:text-slate-900 transition-colors"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Location</h3>
                      <p className="text-slate-600">{contact.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Availability */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-900">
                  <Calendar className="w-5 h-5 mr-2" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed mb-4">
                  {contact.availability}
                </p>
                <Badge className="bg-green-100 text-green-800">
                  Responding within 24-48 hours
                </Badge>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-slate-900">Connect Online</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a 
                    href={contact.socialLinks.linkedin}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                  >
                    <Linkedin className="w-5 h-5 text-blue-600" />
                    <span className="text-slate-700 group-hover:text-blue-600 transition-colors">
                      LinkedIn Profile
                    </span>
                    <ExternalLink className="w-4 h-4 text-slate-400 ml-auto" />
                  </a>
                  
                  <a 
                    href={contact.socialLinks.orcid}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-colors group"
                  >
                    <div className="w-5 h-5 bg-green-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">O</span>
                    </div>
                    <span className="text-slate-700 group-hover:text-green-600 transition-colors">
                      ORCID Profile
                    </span>
                    <ExternalLink className="w-4 h-4 text-slate-400 ml-auto" />
                  </a>
                  
                  <a 
                    href={contact.socialLinks.researchgate}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-teal-50 transition-colors group"
                  >
                    <div className="w-5 h-5 bg-teal-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">R</span>
                    </div>
                    <span className="text-slate-700 group-hover:text-teal-600 transition-colors">
                      ResearchGate
                    </span>
                    <ExternalLink className="w-4 h-4 text-slate-400 ml-auto" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900">Send a Message</CardTitle>
                <p className="text-slate-600">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Type */}
                  <div>
                    <Label htmlFor="type" className="text-slate-700 font-medium">
                      Type of Inquiry
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {contactTypes.map((type) => (
                        <Badge
                          key={type.value}
                          variant={formData.type === type.value ? "default" : "outline"}
                          className={`cursor-pointer transition-all duration-200 ${
                            formData.type === type.value
                              ? 'bg-blue-600 hover:bg-blue-700'
                              : 'hover:bg-slate-100'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                        >
                          {type.label}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-slate-700 font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-slate-700 font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <Label htmlFor="subject" className="text-slate-700 font-medium">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="Brief subject of your message"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className="text-slate-700 font-medium">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-1 min-h-[120px]"
                      placeholder="Please share your message, questions, or inquiry details..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600">
              Common questions about academic collaboration and professional inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Research Collaboration
                </h3>
                <p className="text-slate-600 text-sm">
                  I'm open to collaborative research projects, especially those involving 
                  interdisciplinary approaches and innovative methodologies. Please include 
                  details about your project timeline and expected contributions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Academic Opportunities
                </h3>
                <p className="text-slate-600 text-sm">
                  I'm actively seeking opportunities for graduate programs, research positions, 
                  and academic collaborations. Please feel free to reach out with information 
                  about relevant opportunities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Speaking Engagements
                </h3>
                <p className="text-slate-600 text-sm">
                  Available for academic conferences, seminars, and professional events. 
                  I can speak on topics related to my research areas and academic experiences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Response Time
                </h3>
                <p className="text-slate-600 text-sm">
                  I typically respond to all inquiries within 24-48 hours. For urgent matters, 
                  please indicate this in your subject line, and I'll prioritize your message.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactStatic;