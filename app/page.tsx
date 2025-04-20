import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  Building2,
  ChevronRight,
  Cpu,
  GraduationCap,
  LineChart,
  School,
  Shield,
  Star,
  Target,
  Users,
  Zap,
  BarChart,
  BookMarked,
  Calendar,
  CheckCircle,
  Clock,
  Globe,
  HeartHandshake,
  type LucideIcon,
  MapPin,
  MessageCircle,
  Presentation,
  Sparkles,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface StatItemProps {
  value: string
  label: string
  icon: LucideIcon
}

const StatItem = ({ value, label, icon: Icon }: StatItemProps) => (
  <div className="flex flex-col items-center space-y-2 border-t pt-8">
    <div className="rounded-full bg-blue-100 p-2 mb-2">
      <Icon className="h-6 w-6 text-blue-600" />
    </div>
    <span className="text-5xl font-bold text-blue-600">{value}</span>
    <span className="text-xl text-gray-600 text-center">{label}</span>
  </div>
)

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

const FeatureCard = ({ icon: Icon, title, description, className }: FeatureCardProps) => (
  <Card className={cn("border-none shadow-md hover:shadow-lg transition-shadow", className)}>
    <CardHeader className="pb-2">
      <div className="p-3 w-fit rounded-lg bg-blue-100 mb-2">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
)

interface TestimonialProps {
  name: string
  role: string
  content: string
  rating?: number
}

const Testimonial = ({ name, role, content, rating = 5 }: TestimonialProps) => (
  <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow">
    <CardHeader>
      <div className="flex items-center space-x-4">
        <div className="rounded-full bg-blue-100 p-3">
          <Users className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <CardTitle className="text-lg">{name}</CardTitle>
          <CardDescription>{role}</CardDescription>
        </div>
      </div>
      <div className="flex mt-2">
        {Array(rating)
          .fill(0)
          .map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          ))}
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 italic">"{content}"</p>
    </CardContent>
  </Card>
)

interface BrandCardProps {
  title: string
  description: string
  color: string
  icon?: LucideIcon
}

const BrandCard = ({ title, description, color, icon: Icon }: BrandCardProps) => (
  <Card className={` bg-[#E3F2FD] h-full border-none shadow-md hover:shadow-lg transition-shadow ${color}`}>
    <CardHeader className="pb-2">
      {Icon && (
        <div className="p-3 w-fit rounded-lg bg-white/20 mb-2">
          <Icon className="h-6 w-6 text-white" />
        </div>
      )}
      <CardTitle className="text-xl text-white">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-white/90">{description}</p>
    </CardContent>
    <CardFooter>
      <Link href="#learn-more" className="text-white flex items-center text-sm">
        Know more <ChevronRight className="h-4 w-4 ml-1" />
      </Link>
    </CardFooter>
  </Card>
)

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-40">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-800">SURYADHI</span>
                <div className="absolute -top-1 right-4">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
              <span className="text-xs tracking-widest text-gray-500">LEARNING</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-blue-600">
              Home
            </Link>
            <Link href="#about" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              About us
            </Link>
            <Link href="#nep" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              NEP 2024
            </Link>
            <Link href="#services" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Services
            </Link>
            <Link href="#brands" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Our Brands
            </Link>
            <Link href="#director" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Director's Desk
            </Link>
            <Link href="#career" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Career
            </Link>
            <Link href="#partner" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Become a Partner
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="container px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col space-y-6">
              <Badge className="w-fit bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1 text-sm">
                Educational Excellence
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-gray-800">
                Empowering Schools for Success: Your Partner in{" "}
                <span className="text-blue-600">Educational Academic Solutions</span>
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Enhancing Education Through Comprehensive Services. Join our growing network of educational institutions
                and be part of shaping the future of education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#learn-more">
                  <Button variant="outline" size="lg">
                    Enquire Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-3 grid-rows-3 gap-3">
                <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                    <BookOpen className="h-10 w-10 text-blue-500" />
                  </div>
                </div>
                <div className="col-span-2 row-span-1 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-orange-100 flex items-center justify-center">
                    <GraduationCap className="h-10 w-10 text-orange-500" />
                  </div>
                </div>
                <div className="col-span-1 row-span-2 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-green-100 flex items-center justify-center">
                    <Target className="h-10 w-10 text-green-500" />
                  </div>
                </div>
                <div className="col-span-2 row-span-2 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                    <Presentation className="h-16 w-16 text-purple-500" />
                  </div>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                <div className="text-center">
                  <div className="text-sm">Be</div>
                  <div>Suryadhi</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-20">
            <StatItem value="25+" label="Years of Experience" icon={Clock} />
            <StatItem value="500+" label="Students Enrolled" icon={Users} />
            <StatItem value="10+" label="Schools by 2025" icon={Building2} />
            <StatItem value="95%" label="Success Rate" icon={Target} />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-blue-100 flex items-center justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KYAj1gpJCO75Za0MxFyKwiezSx5kL2.png"
                  alt="Team collaboration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <Badge className="w-fit bg-pink-100 text-pink-600 hover:bg-pink-200 px-3 py-1 text-sm">WHO ARE WE?</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-800">
                We are an education management company promoting preschools, K12 schools and Teachers Training.
              </h2>
              <p className="text-gray-600">
                Suryadhi Learning Pvt. Ltd. (SLPL) is a forward-thinking initiative established in 2023 by seasoned
                education professionals with over 25 years of experience in K12 schooling.
              </p>
              <p className="text-gray-600">
                Founded by Prof. Suresh Bachhav and Mrs. Sushma Bachhav, the visionaries behind New Vision School, SLPL
                aims to provide integrated and holistic education to every Indian student.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium">
                  Suryadhi Pvt. Ltd. introduces 'LEAFP': a unique pedagogy, ensuring an exceptional learning experience.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" size="lg" className="group">
                  Read More <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="bg-green-100 text-green-600 hover:bg-green-200 px-3 py-1 text-sm">OUR APPROACH</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-800">
              The LEAFP Methodology
            </h2>
            <p className="max-w-[800px] text-gray-600 md:text-lg">
              Our unique pedagogical approach ensures comprehensive development and exceptional learning outcomes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-8">
            <Card className="bg-blue-50 border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="p-3 w-fit rounded-full bg-blue-100 mb-2">
                  <span className="text-2xl font-bold text-blue-600">L</span>
                </div>
                <CardTitle>Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Personalized learning paths tailored to individual student needs</p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="p-3 w-fit rounded-full bg-green-100 mb-2">
                  <span className="text-2xl font-bold text-green-600">E</span>
                </div>
                <CardTitle>Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Interactive methods that keep students actively involved</p>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="p-3 w-fit rounded-full bg-amber-100 mb-2">
                  <span className="text-2xl font-bold text-amber-600">A</span>
                </div>
                <CardTitle>Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Continuous evaluation to track progress and identify areas for improvement
                </p>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="p-3 w-fit rounded-full bg-purple-100 mb-2">
                  <span className="text-2xl font-bold text-purple-600">F</span>
                </div>
                <CardTitle>Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Constructive feedback mechanisms for continuous improvement</p>
              </CardContent>
            </Card>

            <Card className="bg-pink-50 border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="p-3 w-fit rounded-full bg-pink-100 mb-2">
                  <span className="text-2xl font-bold text-pink-600">P</span>
                </div>
                <CardTitle>Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Measurable growth in academic and personal development</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section id="brands" className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1 text-sm">SURYADHI BRANDS</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-800">
              Explore Excellence: Unveiling our Distinctive School Brands!
            </h2>
            <p className="max-w-[800px] text-gray-600 md:text-lg">
              Our educational brands are designed to cater to different learning needs while maintaining our core values
              of excellence and innovation
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="all">All Brands</TabsTrigger>
              <TabsTrigger value="preschool">Pre Schools</TabsTrigger>
              <TabsTrigger value="k12">K12 Schools</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <BrandCard
                  title="UTOPIA : World Pre School"
                  description="A Pre School of International Standards. It acts as feeders to our CBSE & ICSE schools."
                  color="bg-gradient-to-br from-blue-500 to-blue-600"
                  icon={School}
                />
                <BrandCard
                  title="UNIX : Global Pre School"
                  description="A chain of Premium Global Pre Schools; It acts as feeders to our main schools."
                  color="bg-gradient-to-br from-orange-500 to-orange-600"
                  icon={Globe}
                />
                <BrandCard
                  title="UTOPIA : Global School"
                  description="A chain of CBSE and ICSE schools with Global Approach (Integrated Curriculum)."
                  color="bg-gradient-to-br from-blue-500 to-blue-600"
                  icon={GraduationCap}
                />
              </div>
            </TabsContent>
            <TabsContent value="preschool" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <BrandCard
                  title="UTOPIA : World Pre School"
                  description="A Pre School of International Standards. It acts as feeders to our CBSE & ICSE schools."
                  color="bg-gradient-to-br from-blue-500 to-blue-600"
                  icon={School}
                />
                <BrandCard
                  title="UNIX : Global Pre School"
                  description="A chain of Premium Global Pre Schools; It acts as feeders to our main schools."
                  color="bg-gradient-to-br from-orange-500 to-orange-600"
                  icon={Globe}
                />
              </div>
            </TabsContent>
            <TabsContent value="k12" className="mt-0">
              <div className="grid grid-cols-1 gap-8">
                <BrandCard
                  title="UTOPIA : Global School"
                  description="A chain of CBSE and ICSE schools with Global Approach (Integrated Curriculum)."
                  color="bg-gradient-to-br from-blue-500 to-blue-600"
                  icon={GraduationCap}
                />
              </div>
            </TabsContent>
            <TabsContent value="training" className="mt-0">
              <div className="grid grid-cols-1 gap-8">
                <BrandCard
                  title="Suryadhi Teacher Training Academy"
                  description="Comprehensive training programs for educators to enhance teaching methodologies and classroom management."
                  color="bg-gradient-to-br from-green-500 to-green-600"
                  icon={BookMarked}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full py-12 md:py-24 bg-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1 text-sm">WHAT WE DO?</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-800">
              Empowering Education Through <br />
              Comprehensive Management Solutions for Academic Excellence
            </h2>
            <p className="max-w-[800px] text-gray-600 md:text-lg">
              Our suite of services is designed to support educational institutions at every level, from curriculum
              development to administrative efficiency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Brain}
              title="Student-Centric Educational Support"
              description="Our academic support features include detailed academic planning, teacher collaboration, and efficient resource management."
            />
            <FeatureCard
              icon={Cpu}
              title="Reliable Technology Support Services"
              description="We provide technical support to schools, upgrading existing technology to meet evolving needs and implementing digital learning solutions."
            />
            <FeatureCard
              icon={Building2}
              title="Streamlined Administrative Solution"
              description="Our comprehensive administrative services provide support for Recruitment, Payroll, School structure, Partner and vendor management."
            />
            <FeatureCard
              icon={Shield}
              title="Assessment Solutions"
              description="We utilize multiple intelligence theories to frame our assessments, ensuring that every learner's needs are met with personalized evaluation methods."
            />
            <FeatureCard
              icon={BookOpen}
              title="Teacher Development Programs"
              description="We provide year-round training and support for teachers to enhance their classroom management skills and teaching methodologies."
            />
            <FeatureCard
              icon={LineChart}
              title="Tailored Marketing Solutions"
              description="Our innovative strategies help maximize participation and build brand equity through diverse activities and strategic partnerships."
            />
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <CardTitle className="text-2xl">Curriculum Development</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Our expert team develops comprehensive curricula aligned with national and international standards
                  while incorporating innovative teaching methodologies.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>CBSE Aligned</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>ICSE Compatible</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>NEP 2024 Ready</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Global Standards</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Learn More</Button>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <CardTitle className="text-2xl">School Management System</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Our comprehensive ERP system streamlines all aspects of school management, from admissions to alumni
                  relations.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Admissions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Fee Management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Staff Management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Report Generation</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/login">
                  <Button>Access ERP</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* NEP 2024 Section */}
      <section id="nep" className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="w-fit bg-purple-100 text-purple-600 hover:bg-purple-200 px-3 py-1 text-sm">
                NEP 2024
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-800">
                Fully Aligned with the National Education Policy 2024
              </h2>
              <p className="text-gray-600">
                Our curriculum and teaching methodologies are completely aligned with the latest National Education
                Policy, ensuring that your institution stays ahead of educational reforms.
              </p>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Holistic Development</AccordionTrigger>
                  <AccordionContent>
                    Our approach focuses on the holistic development of students, integrating cognitive, social,
                    physical, and emotional aspects of learning.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Skill-Based Learning</AccordionTrigger>
                  <AccordionContent>
                    We emphasize practical skills alongside theoretical knowledge, preparing students for real-world
                    challenges.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Multilingual Education</AccordionTrigger>
                  <AccordionContent>
                    Our curriculum supports multilingual education, recognizing the importance of mother tongue while
                    building proficiency in other languages.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Technology Integration</AccordionTrigger>
                  <AccordionContent>
                    Our educational approach integrates cutting-edge technology to enhance learning experiences and
                    prepare students for the digital future.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  NEP 2024 Resources
                </Button>
                <Button variant="outline" size="lg">
                  Implementation Guide
                </Button>
              </div>
            </div>
            <div className="relative h-[500px] w-full rounded-xl overflow-hidden bg-gradient-to-r from-purple-100 to-blue-100 p-8">
              <div className="h-full w-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-6">Key NEP 2024 Features We Implement:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg flex items-start space-x-3">
                    <GraduationCap className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">Flexible Learning Paths</h4>
                      <p className="text-sm">Multiple entry and exit options for students</p>
                    </div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg flex items-start space-x-3">
                    <Globe className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">Global Citizenship</h4>
                      <p className="text-sm">Preparing students for global challenges</p>
                    </div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg flex items-start space-x-3">
                    <BookMarked className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">Interdisciplinary Learning</h4>
                      <p className="text-sm">Breaking silos between subjects</p>
                    </div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg flex items-start space-x-3">
                    <Sparkles className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">Creative Thinking</h4>
                      <p className="text-sm">Fostering innovation and problem-solving</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="w-full py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] w-full rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-blue-100 flex items-center justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DmtyBdIkipQw29ykUiepii0JKLrtjM.png"
                  alt="Educational collage"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <Badge className="w-fit bg-teal-100 text-teal-600 hover:bg-teal-200 px-3 py-1 text-sm">
                WHY CHOOSE US
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-800">
                Transforming Education with Proven Excellence
              </h2>
              <p className="text-gray-600">
                With over 25 years of experience in the education sector, Suryadhi Learning has established itself as a
                leader in providing comprehensive educational solutions. Our commitment to quality education and
                innovative teaching methodologies has helped us create a network of successful educational institutions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-3 mb-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <h3 className="font-bold">Award-Winning Methodology</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Our teaching approaches have been recognized nationally for excellence
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-3 mb-2">
                    <HeartHandshake className="h-5 w-5 text-red-500" />
                    <h3 className="font-bold">Dedicated Support Team</h3>
                  </div>
                  <p className="text-sm text-gray-600">24/7 assistance for all your educational management needs</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-3 mb-2">
                    <BarChart className="h-5 w-5 text-blue-500" />
                    <h3 className="font-bold">Data-Driven Decisions</h3>
                  </div>
                  <p className="text-sm text-gray-600">Analytics-based approach to improve educational outcomes</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-3 mb-2">
                    <Zap className="h-5 w-5 text-orange-500" />
                    <h3 className="font-bold">Rapid Implementation</h3>
                  </div>
                  <p className="text-sm text-gray-600">Quick setup and integration of our educational systems</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/login">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                    Join Our Network
                  </Button>
                </Link>
                <Link href="#testimonials">
                  <Button variant="outline" size="lg">
                    See Success Stories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="w-full py-12 md:py-24 bg-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200 px-3 py-1 text-sm">TESTIMONIALS</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-800">
              What Our Partners Say
            </h2>
            <p className="max-w-[800px] text-gray-600 md:text-lg">
              Hear from educational institutions that have transformed their operations with Suryadhi Learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial
              name="Rajesh Kumar"
              role="Franchise Owner, Delhi"
              content="Partnering with Suryadhi Learning was the best decision for my educational venture. The comprehensive support system and proven curriculum have helped us achieve remarkable growth in just two years."
              rating={5}
            />
            <Testimonial
              name="Priya Sharma"
              role="School Director, Mumbai"
              content="The technology integration and administrative solutions provided by Suryadhi have streamlined our operations significantly. Our teachers can now focus more on teaching rather than paperwork."
              rating={5}
            />
            <Testimonial
              name="Anand Patel"
              role="Franchise Partner, Bangalore"
              content="The marketing support and brand recognition that comes with the Suryadhi name has helped us establish quickly in a competitive market. The ongoing training ensures we stay ahead of educational trends."
              rating={4}
            />
          </div>

          <div className="mt-12 bg-white p-8 rounded-xl shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">98%</div>
                <p className="text-gray-600">Partner satisfaction rate</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">45+</div>
                <p className="text-gray-600">Educational partners nationwide</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">15+</div>
                <p className="text-gray-600">Years average partnership length</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Franchise Opportunities */}
      <section id="partner" className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-200 px-3 py-1 text-sm">
              FRANCHISE OPPORTUNITIES
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-800">
              Invest in Education, Invest in Success
            </h2>
            <p className="max-w-[800px] text-gray-600 md:text-lg">
              Join our growing network of educational institutions and be part of shaping the future of education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="p-3 w-fit rounded-lg bg-orange-100 mb-2">
                  <School className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Pre-School Franchise</CardTitle>
                <CardDescription>Perfect for entrepreneurs looking to enter the education sector</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Investment</span>
                  <span className="font-medium">₹15-25 Lakhs</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>Area Required</span>
                  <span className="font-medium">2,000-3,000 sq.ft</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>ROI Timeline</span>
                  <span className="font-medium">24-36 months</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>Support Provided</span>
                  <span className="font-medium">Comprehensive</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Request Information</Button>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-blue-600">
              <CardHeader className="pb-2">
                <div className="absolute -top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
                  Popular Choice
                </div>
                <div className="p-3 w-fit rounded-lg bg-blue-100 mb-2">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>K12 School Franchise</CardTitle>
                <CardDescription>Comprehensive solution for full-fledged school operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Investment</span>
                  <span className="font-medium">₹50 Lakhs - 1 Crore</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>Area Required</span>
                  <span className="font-medium">1-2 Acres</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>ROI Timeline</span>
                  <span className="font-medium">36-48 months</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>Support Provided</span>
                  <span className="font-medium">End-to-End</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Request Information</Button>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="p-3 w-fit rounded-lg bg-green-100 mb-2">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Training Center Franchise</CardTitle>
                <CardDescription>Specialized in teacher training and professional development</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Investment</span>
                  <span className="font-medium">₹10-20 Lakhs</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>Area Required</span>
                  <span className="font-medium">1,000-2,000 sq.ft</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>ROI Timeline</span>
                  <span className="font-medium">18-24 months</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>Support Provided</span>
                  <span className="font-medium">Specialized</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Request Information</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Ready to Start Your Educational Journey?</h3>
                <p className="mb-6">
                  Fill out our franchise inquiry form and one of our representatives will contact you within 24 hours to
                  discuss the opportunities that best suit your goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/login">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Get Started Today
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg">
                    Download Brochure
                  </Button>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold mb-4">Franchise Benefits at a Glance</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Proven business model with high success rate</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Comprehensive training and ongoing support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Marketing and branding assistance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Curriculum and teaching materials provided</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Technology integration and digital solutions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-blue-600">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Ready to Transform Education?
              </h2>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                Join our network of educational institutions and be part of the future of learning.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Get Started Today
                </Button>
              </Link>
              <Link href="#contact">
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-blue-700">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Badge className="w-fit bg-gray-100 text-gray-600 hover:bg-gray-200 px-3 py-1 text-sm">CONTACT US</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-800">
                Get in Touch With Our Team
              </h2>
              <p className="text-gray-600">
                Have questions about our educational solutions or franchise opportunities? Our team is ready to assist
                you.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-bold">Head Office</h3>
                    <p className="text-gray-600">123 Education Street, Knowledge City, India</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MessageCircle className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-bold">Email Us</h3>
                    <p className="text-gray-600">info@suryadhilearning.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Calendar className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-bold">Business Hours</h3>
                    <p className="text-gray-600">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="font-bold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <Link href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                  <Link href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </Link>
                  <Link href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                  <Link href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      id="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="John Doe"
                      type="text"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="john@example.com"
                      type="email"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="How can we help you?"
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[120px]"
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="bg-violet-100 text-violet-600 hover:bg-violet-200 px-3 py-1 text-sm">
              FREQUENTLY ASKED QUESTIONS
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-800">
              Got Questions? We've Got Answers
            </h2>
            <p className="max-w-[800px] text-gray-600 md:text-lg">
              Find answers to commonly asked questions about our educational solutions and franchise opportunities
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is the investment required for a Suryadhi franchise?</AccordionTrigger>
                <AccordionContent>
                  The investment varies based on the type of franchise. Pre-school franchises typically require ₹15-25
                  Lakhs, K12 schools require ₹50 Lakhs - 1 Crore, and training centers require ₹10-20 Lakhs. These
                  amounts include setup costs, training, and initial marketing.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How long does it take to set up a Suryadhi school?</AccordionTrigger>
                <AccordionContent>
                  The timeline varies based on the type of institution. Pre-schools can be set up in 3-4 months, while
                  K12 schools typically take 6-12 months. Our team provides end-to-end support throughout the setup
                  process to ensure a smooth launch.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What kind of support does Suryadhi provide to franchisees?</AccordionTrigger>
                <AccordionContent>
                  We provide comprehensive support including curriculum development, teacher training, marketing
                  assistance, operational guidance, technology integration, and ongoing administrative support. Our goal
                  is to ensure the success of every franchise partner.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How is the Suryadhi curriculum different from others?</AccordionTrigger>
                <AccordionContent>
                  The Suryadhi curriculum is based on our unique LEAFP methodology, which focuses on Learning,
                  Engagement, Assessment, Feedback, and Progress. It integrates national and international standards
                  while emphasizing practical skills, critical thinking, and holistic development.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Can I convert my existing school to a Suryadhi franchise?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer conversion programs for existing educational institutions. Our team will assess your
                  current setup and provide a customized transition plan to integrate Suryadhi methodologies,
                  curriculum, and management systems while preserving your institution's unique identity.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>What technology solutions does Suryadhi provide?</AccordionTrigger>
                <AccordionContent>
                  We provide a comprehensive ERP system that manages admissions, fee collection, staff management,
                  academic planning, assessment tracking, and reporting. Additionally, we offer digital learning
                  platforms, smart classroom solutions, and parent communication tools.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-white">SURYADHI</span>
                <div className="relative -top-1 right-0 ml-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
              <span className="text-xs tracking-widest text-gray-400">LEARNING</span>
              <p className="text-gray-400">
                Transforming education through innovative solutions and comprehensive support.
              </p>
              <div className="flex space-x-4 mt-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-gray-400 hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#brands" className="text-gray-400 hover:text-white">
                    Our Brands
                  </Link>
                </li>
                <li>
                  <Link href="#partner" className="text-gray-400 hover:text-white">
                    Franchise Opportunities
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Our Solutions</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Pre-School Education
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    K12 Education
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Teacher Training
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    School Management
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Educational Consulting
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-400">123 Education Street, Knowledge City, India</span>
                </li>
                <li className="flex items-start space-x-3">
                  <MessageCircle className="h-5 w-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-400">info@suryadhilearning.com</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-400">Monday - Saturday: 9:00 AM - 6:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Suryadhi Learning. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <div className="fixed bottom-6 right-6">
        <Link href="#top">
          <Button size="icon" className="rounded-full bg-blue-600 hover:bg-blue-700 h-12 w-12">
            <ArrowRight className="h-6 w-6 rotate-270 text-white" />
            <span className="sr-only">Back to top</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}