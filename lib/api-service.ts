// This file contains all API service functions for the ERP system

// Mock data for dashboard
export const getDashboardData = async () => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return {
    success: true,
    data: {
      metrics: {
        enquiry: 25230,
        lsqEnquiry: 18456,
        grossAdmission: 12789,
        quit: 345,
        transferIn: 567,
        transferOut: 432,
        fcrDeposited: 10234,
        fcrPending: 2555,
        paymentDue: 3456,
        receivable: 4567890,
        collection: 3456789,
        creditNote: 234567,
      },
      charts: {
        enquiryData: [
          { name: "Play Group", value: 47, count: 7, fill: "#3b82f6" },
          { name: "Nursery", value: 33, count: 5, fill: "#1e3a8a" },
          { name: "Euro Junior", value: 13, count: 2, fill: "#84cc16" },
          { name: "Euro Senior", value: 7, count: 1, fill: "#b91c1c" },
        ],
        admissionData: [
          { name: "Play Group", value: 60, count: 6, fill: "#3b82f6" },
          { name: "Nursery", value: 30, count: 3, fill: "#1e3a8a" },
          { name: "Euro Junior", value: 10, count: 1, fill: "#84cc16" },
        ],
        enrollmentTrendsData: [
          { month: "Jan", playGroup: 40, nursery: 24, euroJunior: 10, euroSenior: 5 },
          { month: "Feb", playGroup: 42, nursery: 26, euroJunior: 12, euroSenior: 6 },
          { month: "Mar", playGroup: 45, nursery: 28, euroJunior: 13, euroSenior: 7 },
          { month: "Apr", playGroup: 47, nursery: 33, euroJunior: 13, euroSenior: 7 },
          { month: "May", playGroup: 50, nursery: 35, euroJunior: 15, euroSenior: 8 },
          { month: "Jun", playGroup: 52, nursery: 37, euroJunior: 16, euroSenior: 9 },
        ],
        feeCollectionData: [
          { month: "Jan", amount: 120000 },
          { month: "Feb", amount: 140000 },
          { month: "Mar", amount: 160000 },
          { month: "Apr", amount: 180000 },
          { month: "May", amount: 200000 },
          { month: "Jun", amount: 220000 },
        ],
      },
      shortageData: [
        {
          id: "SD001",
          reportDate: "2023-04-10",
          quantity: 5,
          status: "Pending",
          remarks: "Missing textbooks",
          asOn: "2023-04-15",
        },
        {
          id: "SD002",
          reportDate: "2023-04-12",
          quantity: 3,
          status: "Resolved",
          remarks: "Damaged uniforms",
          asOn: "2023-04-18",
        },
      ],
      feeStructure: {
        euroJunior: [
          { description: "Registration Fee", rate: 8800, royaltyPercentage: 0 },
          { description: "Term Fee", rate: 3300, royaltyPercentage: 0 },
          { description: "Tuition Fee", rate: 24800, royaltyPercentage: 0 },
          { description: "Uniforms", rate: 2150, royaltyPercentage: 0 },
        ],
        euroSenior: [
          { description: "Registration Fee", rate: 8900, royaltyPercentage: 0 },
          { description: "Term Fee", rate: 3300, royaltyPercentage: 0 },
          { description: "Tuition Fee", rate: 27400, royaltyPercentage: 0 },
          { description: "Uniforms", rate: 2150, royaltyPercentage: 0 },
        ],
      },
    },
  }
}

// Mock data for enquiries
const enquiryData = [
  {
    id: "ENQ001",
    name: "John Smith",
    phone: "9876543210",
    email: "john@example.com",
    course: "Computer Science",
    date: "2023-04-10",
    status: "New",
    source: "Website",
    notes: "Interested in evening classes",
  },
  {
    id: "ENQ002",
    name: "Sarah Johnson",
    phone: "8765432109",
    email: "sarah@example.com",
    course: "Business Administration",
    date: "2023-04-09",
    status: "Contacted",
    source: "Referral",
    notes: "Called and scheduled a campus visit",
  },
  {
    id: "ENQ003",
    name: "Michael Brown",
    phone: "7654321098",
    email: "michael@example.com",
    course: "Electrical Engineering",
    date: "2023-04-08",
    status: "Interested",
    source: "Social Media",
    notes: "Wants more information about scholarships",
  },
  {
    id: "ENQ004",
    name: "Emily Davis",
    phone: "6543210987",
    email: "emily@example.com",
    course: "Psychology",
    date: "2023-04-07",
    status: "Not Interested",
    source: "Education Fair",
    notes: "Looking for a different program",
  },
  {
    id: "ENQ005",
    name: "David Wilson",
    phone: "5432109876",
    email: "david@example.com",
    course: "Mechanical Engineering",
    date: "2023-04-06",
    status: "Enrolled",
    source: "Google Ad",
    notes: "Completed enrollment process",
  },
]

// Enquiry API functions
export const getEnquiries = async () => {
  try {
    const res = await fetch("http://localhost:4000/api/enquiries", {
      credentials: "include",
    })
    const data = await res.json()
    return { success: true, data: data.data }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Failed to fetch enquiries", err.message)
      return { success: false, error: err.message }
    } else {
      console.error("Failed to fetch enquiries", err)
      return { success: false, error: "An unexpected error occurred" }
    }
  }
}
export const getEnquiryCount = async () => {
  try {
    const res = await fetch("http://localhost:4000/api/enquiries", {
      credentials: "include",
    })
    const data = await res.json()
    if (Array.isArray(data.data)) {
      return { success: true, count: data.data.length }
    }
    return { success: false, count: 0 }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Failed to fetch enquiry count:", err.message)
      return { success: false, count: 0 }
    }
    return { success: false, count: 0 }
  }
}


export const getEnquiryById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const enquiry = enquiryData.find((e) => e.id === id)
  return enquiry ? { success: true, data: enquiry } : { success: false, error: "Enquiry not found" }
}

export const createEnquiry = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `ENQ${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newEnquiry = {
    id: newId,
    ...data,
    date: new Date().toISOString().split("T")[0],
    status: "New",
  }
  enquiryData.push(newEnquiry)
  return { success: true, data: newEnquiry }
}

export const updateEnquiry = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = enquiryData.findIndex((e) => e.id === id)
  if (index === -1) {
    return { success: false, error: "Enquiry not found" }
  }
  enquiryData[index] = { ...enquiryData[index], ...data }
  return { success: true, data: enquiryData[index] }
}

export const deleteEnquiry = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = enquiryData.findIndex((e) => e.id === id)
  if (index === -1) {
    return { success: false, error: "Enquiry not found" }
  }
  enquiryData.splice(index, 1)
  return { success: true }
}

// LSQ Enquiry API functions
const lsqEnquiryData = [
  {
    id: "LSQ001",
    name: "John Smith",
    phone: "9876543210",
    email: "john@example.com",
    course: "Computer Science",
    source: "Website",
    date: "2023-04-10",
    status: "New",
    notes: "Interested in scholarship options",
  },
  {
    id: "LSQ002",
    name: "Sarah Johnson",
    phone: "8765432109",
    email: "sarah@example.com",
    course: "Business Administration",
    source: "Social Media",
    date: "2023-04-09",
    status: "Contacted",
    notes: "Called and discussed course details",
  },
  {
    id: "LSQ003",
    name: "Michael Brown",
    phone: "7654321098",
    email: "michael@example.com",
    course: "Electrical Engineering",
    source: "Referral",
    date: "2023-04-08",
    status: "Interested",
    notes: "Wants to visit campus next week",
  },
  {
    id: "LSQ004",
    name: "Emily Davis",
    phone: "6543210987",
    email: "emily@example.com",
    course: "Psychology",
    source: "Google",
    date: "2023-04-07",
    status: "Not Interested",
    notes: "Looking for a different program",
  },
  {
    id: "LSQ005",
    name: "David Wilson",
    phone: "5432109876",
    email: "david@example.com",
    course: "Mechanical Engineering",
    source: "Exhibition",
    date: "2023-04-06",
    status: "Converted",
    notes: "Completed admission process",
  },
]

export const getLSQEnquiries = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: lsqEnquiryData }
}

export const getLSQEnquiryById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const enquiry = lsqEnquiryData.find((e) => e.id === id)
  return enquiry ? { success: true, data: enquiry } : { success: false, error: "LSQ Enquiry not found" }
}

export const createLSQEnquiry = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `LSQ${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newEnquiry = {
    id: newId,
    ...data,
    date: new Date().toISOString().split("T")[0],
    status: "New",
  }
  lsqEnquiryData.push(newEnquiry)
  return { success: true, data: newEnquiry }
}

export const updateLSQEnquiry = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = lsqEnquiryData.findIndex((e) => e.id === id)
  if (index === -1) {
    return { success: false, error: "LSQ Enquiry not found" }
  }
  lsqEnquiryData[index] = { ...lsqEnquiryData[index], ...data }
  return { success: true, data: lsqEnquiryData[index] }
}

export const deleteLSQEnquiry = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = lsqEnquiryData.findIndex((e) => e.id === id)
  if (index === -1) {
    return { success: false, error: "LSQ Enquiry not found" }
  }
  lsqEnquiryData.splice(index, 1)
  return { success: true }
}

// Admission API functions
const admissionData = [
  {
    id: "ADM001",
    studentId: "STU1001",
    name: "John Smith",
    course: "Computer Science",
    batch: "2023-24",
    admissionDate: "2023-04-10",
    status: "Active",
    fee: 75000,
    feeStatus: "Paid",
    enquiryId: "ENQ001",
  },
  {
    id: "ADM002",
    studentId: "STU1002",
    name: "Sarah Johnson",
    course: "Business Administration",
    batch: "2023-24",
    admissionDate: "2023-04-09",
    status: "Active",
    fee: 65000,
    feeStatus: "Partial",
    enquiryId: "ENQ002",
  },
  {
    id: "ADM003",
    studentId: "STU1003",
    name: "Michael Brown",
    course: "Electrical Engineering",
    batch: "2023-24",
    admissionDate: "2023-04-08",
    status: "Pending",
    fee: 80000,
    feeStatus: "Pending",
    enquiryId: "ENQ003",
  },
  {
    id: "ADM004",
    studentId: "STU1004",
    name: "Emily Davis",
    course: "Psychology",
    batch: "2023-24",
    admissionDate: "2023-04-07",
    status: "Active",
    fee: 60000,
    feeStatus: "Paid",
    enquiryId: "ENQ004",
  },
  {
    id: "ADM005",
    studentId: "STU1005",
    name: "David Wilson",
    course: "Mechanical Engineering",
    batch: "2023-24",
    admissionDate: "2023-04-06",
    status: "Cancelled",
    fee: 80000,
    feeStatus: "Refunded",
    enquiryId: "ENQ005",
  },
]

export const getAdmissions = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: admissionData }
}

export const getAdmissionById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const admission = admissionData.find((a) => a.id === id)
  return admission ? { success: true, data: admission } : { success: false, error: "Admission not found" }
}

export const createAdmission = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `ADM${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const studentId = `STU${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`
  const newAdmission = {
    id: newId,
    studentId,
    ...data,
    admissionDate: new Date().toISOString().split("T")[0],
    status: "Pending",
  }
  admissionData.push(newAdmission)
  return { success: true, data: newAdmission }
}

export const updateAdmission = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = admissionData.findIndex((a) => a.id === id)
  if (index === -1) {
    return { success: false, error: "Admission not found" }
  }
  admissionData[index] = { ...admissionData[index], ...data }
  return { success: true, data: admissionData[index] }
}

export const deleteAdmission = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = admissionData.findIndex((a) => a.id === id)
  if (index === -1) {
    return { success: false, error: "Admission not found" }
  }
  admissionData.splice(index, 1)
  return { success: true }
}

// Transfer Stage API functions
const transferData = [
  {
    id: "TRF001",
    studentId: "STU1001",
    name: "John Smith",
    currentSchool: "EuroKids Andheri",
    targetSchool: "EuroKids Bandra",
    requestDate: "2023-04-10",
    status: "Pending",
    reason: "Relocation",
    notes: "Family moving to Bandra area",
  },
  {
    id: "TRF002",
    studentId: "STU1002",
    name: "Sarah Johnson",
    currentSchool: "EuroKids Juhu",
    targetSchool: "EuroKids Powai",
    requestDate: "2023-04-09",
    status: "Approved",
    reason: "Convenience",
    notes: "Parent's workplace changed",
  },
  {
    id: "TRF003",
    studentId: "STU1003",
    name: "Michael Brown",
    currentSchool: "EuroKids Malad",
    targetSchool: "EuroKids Goregaon",
    requestDate: "2023-04-08",
    status: "Rejected",
    reason: "Preference",
    notes: "No seats available in target school",
  },
  {
    id: "TRF004",
    studentId: "STU1004",
    name: "Emily Davis",
    currentSchool: "EuroKids Dadar",
    targetSchool: "EuroKids Worli",
    requestDate: "2023-04-07",
    status: "Completed",
    reason: "Relocation",
    notes: "Transfer completed on April 15",
  },
  {
    id: "TRF005",
    studentId: "STU1005",
    name: "David Wilson",
    currentSchool: "EuroKids Thane",
    targetSchool: "EuroKids Mulund",
    requestDate: "2023-04-06",
    status: "Pending",
    reason: "Convenience",
    notes: "Sibling studying in target school",
  },
]

export const getTransfers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: transferData }
}

export const getTransferById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const transfer = transferData.find((t) => t.id === id)
  return transfer ? { success: true, data: transfer } : { success: false, error: "Transfer request not found" }
}

export const createTransfer = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `TRF${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newTransfer = {
    id: newId,
    ...data,
    requestDate: new Date().toISOString().split("T")[0],
    status: "Pending",
  }
  transferData.push(newTransfer)
  return { success: true, data: newTransfer }
}

export const updateTransfer = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = transferData.findIndex((t) => t.id === id)
  if (index === -1) {
    return { success: false, error: "Transfer request not found" }
  }
  transferData[index] = { ...transferData[index], ...data }
  return { success: true, data: transferData[index] }
}

export const deleteTransfer = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = transferData.findIndex((t) => t.id === id)
  if (index === -1) {
    return { success: false, error: "Transfer request not found" }
  }
  transferData.splice(index, 1)
  return { success: true }
}

// DTP View API functions
const dtpData = [
  {
    id: "DTP001",
    studentId: "STU1001",
    name: "John Smith",
    program: "Play Group",
    dtpDate: "2023-04-15",
    status: "Scheduled",
    teacherId: "TCH001",
    teacherName: "Ms. Priya Sharma",
    notes: "First DTP session",
  },
  {
    id: "DTP002",
    studentId: "STU1002",
    name: "Sarah Johnson",
    program: "Nursery",
    dtpDate: "2023-04-16",
    status: "Completed",
    teacherId: "TCH002",
    teacherName: "Mr. Rajesh Kumar",
    notes: "Good progress in language skills",
  },
  {
    id: "DTP003",
    studentId: "STU1003",
    name: "Michael Brown",
    program: "Euro Junior",
    dtpDate: "2023-04-17",
    status: "Cancelled",
    teacherId: "TCH003",
    teacherName: "Ms. Anita Desai",
    notes: "Student was unwell",
  },
  {
    id: "DTP004",
    studentId: "STU1004",
    name: "Emily Davis",
    program: "Euro Senior",
    dtpDate: "2023-04-18",
    status: "Scheduled",
    teacherId: "TCH001",
    teacherName: "Ms. Priya Sharma",
    notes: "Follow-up session",
  },
  {
    id: "DTP005",
    studentId: "STU1005",
    name: "David Wilson",
    program: "Play Group",
    dtpDate: "2023-04-19",
    status: "Pending",
    teacherId: "TCH002",
    teacherName: "Mr. Rajesh Kumar",
    notes: "Initial assessment",
  },
]

export const getDTPSessions = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: dtpData }
}

export const getDTPSessionById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const session = dtpData.find((d) => d.id === id)
  return session ? { success: true, data: session } : { success: false, error: "DTP session not found" }
}

export const createDTPSession = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `DTP${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newSession = {
    id: newId,
    ...data,
    status: "Scheduled",
  }
  dtpData.push(newSession)
  return { success: true, data: newSession }
}

export const updateDTPSession = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = dtpData.findIndex((d) => d.id === id)
  if (index === -1) {
    return { success: false, error: "DTP session not found" }
  }
  dtpData[index] = { ...dtpData[index], ...data }
  return { success: true, data: dtpData[index] }
}

export const deleteDTPSession = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = dtpData.findIndex((d) => d.id === id)
  if (index === -1) {
    return { success: false, error: "DTP session not found" }
  }
  dtpData.splice(index, 1)
  return { success: true }
}

// Payment Details API functions
const onlinePayments = [
  {
    id: "ONL001",
    studentId: "STU1001",
    name: "John Smith",
    amount: 15000,
    date: "2023-04-10",
    status: "Completed",
    transactionId: "TXN78945612",
  },
  {
    id: "ONL002",
    studentId: "STU1002",
    name: "Sarah Johnson",
    amount: 12500,
    date: "2023-04-09",
    status: "Completed",
    transactionId: "TXN78945613",
  },
  {
    id: "ONL003",
    studentId: "STU1003",
    name: "Michael Brown",
    amount: 18000,
    date: "2023-04-08",
    status: "Pending",
    transactionId: "TXN78945614",
  },
  {
    id: "ONL004",
    studentId: "STU1004",
    name: "Emily Davis",
    amount: 9500,
    date: "2023-04-07",
    status: "Failed",
    transactionId: "TXN78945615",
  },
  {
    id: "ONL005",
    studentId: "STU1005",
    name: "David Wilson",
    amount: 21000,
    date: "2023-04-06",
    status: "Completed",
    transactionId: "TXN78945616",
  },
]

const cashPayments = [
  {
    id: "CSH001",
    studentId: "STU1006",
    name: "Jennifer Lee",
    amount: 10000,
    date: "2023-04-10",
    receiptNo: "RCP78945612",
  },
  {
    id: "CSH002",
    studentId: "STU1007",
    name: "Robert Taylor",
    amount: 8500,
    date: "2023-04-09",
    receiptNo: "RCP78945613",
  },
  {
    id: "CSH003",
    studentId: "STU1008",
    name: "Jessica Clark",
    amount: 15000,
    date: "2023-04-08",
    receiptNo: "RCP78945614",
  },
  {
    id: "CSH004",
    studentId: "STU1009",
    name: "William Moore",
    amount: 12000,
    date: "2023-04-07",
    receiptNo: "RCP78945615",
  },
  {
    id: "CSH005",
    studentId: "STU1010",
    name: "Elizabeth White",
    amount: 9000,
    date: "2023-04-06",
    receiptNo: "RCP78945616",
  },
]

const chequePayments = [
  {
    id: "CHQ001",
    studentId: "STU1011",
    name: "Thomas Anderson",
    amount: 18000,
    date: "2023-04-10",
    chequeNo: "123456",
    bankName: "HDFC Bank",
    status: "Cleared",
  },
  {
    id: "CHQ002",
    studentId: "STU1012",
    name: "Patricia Martin",
    amount: 14500,
    date: "2023-04-09",
    chequeNo: "123457",
    bankName: "ICICI Bank",
    status: "Pending",
  },
  {
    id: "CHQ003",
    studentId: "STU1013",
    name: "Charles Harris",
    amount: 22000,
    date: "2023-04-08",
    chequeNo: "123458",
    bankName: "SBI",
    status: "Cleared",
  },
  {
    id: "CHQ004",
    studentId: "STU1014",
    name: "Linda Robinson",
    amount: 16500,
    date: "2023-04-07",
    chequeNo: "123459",
    bankName: "Axis Bank",
    status: "Bounced",
  },
  {
    id: "CHQ005",
    studentId: "STU1015",
    name: "Richard Lewis",
    amount: 19000,
    date: "2023-04-06",
    chequeNo: "123460",
    bankName: "Kotak Bank",
    status: "Cleared",
  },
]

export const getOnlinePayments = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: onlinePayments }
}

export const getCashPayments = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: cashPayments }
}

export const getChequePayments = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: chequePayments }
}

export const getAllPayments = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    success: true,
    data: {
      online: onlinePayments,
      cash: cashPayments,
      cheque: chequePayments,
    },
  }
}

export const createPayment = async (type: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  let newId
  let newPayment

  if (type === "online") {
    newId = `ONL${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(3, "0")}`
    newPayment = {
      id: newId,
      ...data,
      date: new Date().toISOString().split("T")[0],
      status: "Completed",
    }
    onlinePayments.push(newPayment)
  } else if (type === "cash") {
    newId = `CSH${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(3, "0")}`
    const receiptNo = `RCP${Math.floor(Math.random() * 100000000)}`
    newPayment = {
      id: newId,
      ...data,
      date: new Date().toISOString().split("T")[0],
      receiptNo,
    }
    cashPayments.push(newPayment)
  } else if (type === "cheque") {
    newId = `CHQ${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(3, "0")}`
    newPayment = {
      id: newId,
      ...data,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
    }
    chequePayments.push(newPayment)
  } else {
    return { success: false, error: "Invalid payment type" }
  }

  return { success: true, data: newPayment }
}

// Staff Attendance API functions
const staffAttendanceData = [
  {
    id: "ATT001",
    staffId: "STF001",
    name: "Priya Sharma",
    designation: "Teacher",
    date: "2023-04-10",
    status: "Present",
    checkIn: "08:45",
    checkOut: "16:30",
    remarks: "",
  },
  {
    id: "ATT002",
    staffId: "STF002",
    name: "Rajesh Kumar",
    designation: "Teacher",
    date: "2023-04-10",
    status: "Present",
    checkIn: "08:30",
    checkOut: "16:45",
    remarks: "",
  },
  {
    id: "ATT003",
    staffId: "STF003",
    name: "Anita Desai",
    designation: "Teacher",
    date: "2023-04-10",
    status: "Absent",
    checkIn: "",
    checkOut: "",
    remarks: "Sick leave",
  },
  {
    id: "ATT004",
    staffId: "STF004",
    name: "Suresh Patel",
    designation: "Admin",
    date: "2023-04-10",
    status: "Present",
    checkIn: "09:00",
    checkOut: "17:00",
    remarks: "",
  },
  {
    id: "ATT005",
    staffId: "STF005",
    name: "Meera Joshi",
    designation: "Helper",
    date: "2023-04-10",
    status: "Late",
    checkIn: "10:15",
    checkOut: "17:30",
    remarks: "Traffic issue",
  },
]

export const getStaffAttendance = async (date?: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  if (date) {
    const filteredData = staffAttendanceData.filter((a) => a.date === date)
    return { success: true, data: filteredData }
  }
  return { success: true, data: staffAttendanceData }
}

export const updateStaffAttendance = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = staffAttendanceData.findIndex((a) => a.id === id)
  if (index === -1) {
    return { success: false, error: "Attendance record not found" }
  }
  staffAttendanceData[index] = { ...staffAttendanceData[index], ...data }
  return { success: true, data: staffAttendanceData[index] }
}

// Staff Details API functions
const staffDetailsData = [
  {
    id: "STF001",
    name: "Priya Sharma",
    designation: "Teacher",
    department: "Academic",
    joiningDate: "2020-06-15",
    email: "priya.sharma@example.com",
    phone: "9876543210",
    address: "123, ABC Colony, Mumbai",
    qualification: "B.Ed, M.A. in Education",
    experience: "5 years",
    status: "Active",
  },
  {
    id: "STF002",
    name: "Rajesh Kumar",
    designation: "Teacher",
    department: "Academic",
    joiningDate: "2019-08-10",
    email: "rajesh.kumar@example.com",
    phone: "8765432109",
    address: "456, XYZ Society, Mumbai",
    qualification: "B.Ed, M.Sc. in Mathematics",
    experience: "7 years",
    status: "Active",
  },
  {
    id: "STF003",
    name: "Anita Desai",
    designation: "Teacher",
    department: "Academic",
    joiningDate: "2021-02-20",
    email: "anita.desai@example.com",
    phone: "7654321098",
    address: "789, PQR Apartments, Mumbai",
    qualification: "B.Ed, B.A. in English",
    experience: "3 years",
    status: "Active",
  },
  {
    id: "STF004",
    name: "Suresh Patel",
    designation: "Admin",
    department: "Administration",
    joiningDate: "2018-11-05",
    email: "suresh.patel@example.com",
    phone: "6543210987",
    address: "101, LMN Heights, Mumbai",
    qualification: "MBA in HR",
    experience: "8 years",
    status: "Active",
  },
  {
    id: "STF005",
    name: "Meera Joshi",
    designation: "Helper",
    department: "Support",
    joiningDate: "2022-01-10",
    email: "meera.joshi@example.com",
    phone: "5432109876",
    address: "202, DEF Road, Mumbai",
    qualification: "High School",
    experience: "2 years",
    status: "Active",
  },
]

export const getStaffDetails = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: staffDetailsData }
}

export const getStaffById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const staff = staffDetailsData.find((s) => s.id === id)
  return staff ? { success: true, data: staff } : { success: false, error: "Staff not found" }
}

export const createStaff = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `STF${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newStaff = {
    id: newId,
    ...data,
    status: "Active",
  }
  staffDetailsData.push(newStaff)
  return { success: true, data: newStaff }
}

export const updateStaff = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = staffDetailsData.findIndex((s) => s.id === id)
  if (index === -1) {
    return { success: false, error: "Staff not found" }
  }
  staffDetailsData[index] = { ...staffDetailsData[index], ...data }
  return { success: true, data: staffDetailsData[index] }
}

export const deleteStaff = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = staffDetailsData.findIndex((s) => s.id === id)
  if (index === -1) {
    return { success: false, error: "Staff not found" }
  }
  staffDetailsData.splice(index, 1)
  return { success: true }
}

// Teaching Subject API functions
const teachingSubjectData = [
  {
    id: "SUB001",
    staffId: "STF001",
    staffName: "Priya Sharma",
    subject: "English",
    grade: "Nursery",
    section: "A",
    schedule: "Monday, Wednesday, Friday",
    timings: "09:00 - 10:00",
    status: "Active",
  },
  {
    id: "SUB002",
    staffId: "STF001",
    staffName: "Priya Sharma",
    subject: "EVS",
    grade: "Nursery",
    section: "B",
    schedule: "Tuesday, Thursday",
    timings: "10:00 - 11:00",
    status: "Active",
  },
  {
    id: "SUB003",
    staffId: "STF002",
    staffName: "Rajesh Kumar",
    subject: "Mathematics",
    grade: "Euro Junior",
    section: "A",
    schedule: "Monday, Wednesday, Friday",
    timings: "11:00 - 12:00",
    status: "Active",
  },
  {
    id: "SUB004",
    staffId: "STF002",
    staffName: "Rajesh Kumar",
    subject: "Science",
    grade: "Euro Junior",
    section: "B",
    schedule: "Tuesday, Thursday",
    timings: "09:00 - 10:00",
    status: "Active",
  },
  {
    id: "SUB005",
    staffId: "STF003",
    staffName: "Anita Desai",
    subject: "Art & Craft",
    grade: "Play Group",
    section: "A",
    schedule: "Monday, Wednesday",
    timings: "10:00 - 11:00",
    status: "Active",
  },
]

export const getTeachingSubjects = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: teachingSubjectData }
}

export const getTeachingSubjectsByStaffId = async (staffId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const subjects = teachingSubjectData.filter((s) => s.staffId === staffId)
  return { success: true, data: subjects }
}

export const createTeachingSubject = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `SUB${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newSubject = {
    id: newId,
    ...data,
    status: "Active",
  }
  teachingSubjectData.push(newSubject)
  return { success: true, data: newSubject }
}

export const updateTeachingSubject = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = teachingSubjectData.findIndex((s) => s.id === id)
  if (index === -1) {
    return { success: false, error: "Teaching subject not found" }
  }
  teachingSubjectData[index] = { ...teachingSubjectData[index], ...data }
  return { success: true, data: teachingSubjectData[index] }
}

export const deleteTeachingSubject = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = teachingSubjectData.findIndex((s) => s.id === id)
  if (index === -1) {
    return { success: false, error: "Teaching subject not found" }
  }
  teachingSubjectData.splice(index, 1)
  return { success: true }
}

// Admission Details Report API functions
export const getAdmissionDetailsReport = async (filters?: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  let filteredData = [...admissionData]

  if (filters) {
    if (filters.status) {
      filteredData = filteredData.filter((a) => a.status === filters.status)
    }
    if (filters.dateFrom && filters.dateTo) {
      filteredData = filteredData.filter(
        (a) =>
          new Date(a.admissionDate) >= new Date(filters.dateFrom) &&
          new Date(a.admissionDate) <= new Date(filters.dateTo),
      )
    }
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase()
      filteredData = filteredData.filter(
        (a) =>
          a.name.toLowerCase().includes(term) ||
          a.studentId.toLowerCase().includes(term) ||
          a.id.toLowerCase().includes(term) ||
          a.course.toLowerCase().includes(term),
      )
    }
  }

  return { success: true, data: filteredData }
}

// Fee Card Details Report API functions
const feeCardData = [
  {
    id: "FCD001",
    studentId: "STU1001",
    name: "John Smith",
    course: "Computer Science",
    batch: "2023-24",
    totalFee: 75000,
    paidAmount: 75000,
    dueAmount: 0,
    lastPaymentDate: "2023-03-15",
    status: "Paid",
  },
  {
    id: "FCD002",
    studentId: "STU1002",
    name: "Sarah Johnson",
    course: "Business Administration",
    batch: "2023-24",
    totalFee: 65000,
    paidAmount: 40000,
    dueAmount: 25000,
    lastPaymentDate: "2023-02-20",
    status: "Partial",
  },
  {
    id: "FCD003",
    studentId: "STU1003",
    name: "Michael Brown",
    course: "Electrical Engineering",
    batch: "2023-24",
    totalFee: 80000,
    paidAmount: 0,
    dueAmount: 80000,
    lastPaymentDate: "",
    status: "Pending",
  },
  {
    id: "FCD004",
    studentId: "STU1004",
    name: "Emily Davis",
    course: "Psychology",
    batch: "2023-24",
    totalFee: 60000,
    paidAmount: 60000,
    dueAmount: 0,
    lastPaymentDate: "2023-01-10",
    status: "Paid",
  },
  {
    id: "FCD005",
    studentId: "STU1005",
    name: "David Wilson",
    course: "Mechanical Engineering",
    batch: "2023-24",
    totalFee: 80000,
    paidAmount: 80000,
    dueAmount: 0,
    lastPaymentDate: "2023-03-05",
    status: "Paid",
  },
]

export const getFeeCardDetails = async (filters?: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  let filteredData = [...feeCardData]

  if (filters) {
    if (filters.status) {
      filteredData = filteredData.filter((f) => f.status === filters.status)
    }
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase()
      filteredData = filteredData.filter(
        (f) =>
          f.name.toLowerCase().includes(term) ||
          f.studentId.toLowerCase().includes(term) ||
          f.id.toLowerCase().includes(term) ||
          f.course.toLowerCase().includes(term),
      )
    }
  }

  return { success: true, data: filteredData }
}

// Exchange Order API functions
const exchangeOrderData = [
  {
    id: "EXO001",
    orderDate: "2023-04-10",
    studentId: "STU1001",
    studentName: "John Smith",
    itemName: "School Uniform",
    oldSize: "M",
    newSize: "L",
    reason: "Size too small",
    status: "Pending",
    approvedBy: "",
    approvalDate: "",
  },
  {
    id: "EXO002",
    orderDate: "2023-04-09",
    studentId: "STU1002",
    studentName: "Sarah Johnson",
    itemName: "School Bag",
    oldSize: "Standard",
    newSize: "Large",
    reason: "Defective zipper",
    status: "Approved",
    approvedBy: "Admin",
    approvalDate: "2023-04-11",
  },
  {
    id: "EXO003",
    orderDate: "2023-04-08",
    studentId: "STU1003",
    name: "Michael Brown",
    itemName: "School Shoes",
    oldSize: "6",
    newSize: "7",
    reason: "Size too small",
    status: "Completed",
    approvedBy: "Admin",
    approvalDate: "2023-04-10",
  },
  {
    id: "EXO004",
    orderDate: "2023-04-07",
    studentId: "STU1004",
    name: "Emily Davis",
    itemName: "School Uniform",
    oldSize: "S",
    newSize: "M",
    reason: "Size too small",
    status: "Rejected",
    approvedBy: "Admin",
    approvalDate: "2023-04-09",
  },
  {
    id: "EXO005",
    orderDate: "2023-04-06",
    studentId: "STU1005",
    name: "David Wilson",
    itemName: "School Belt",
    oldSize: "M",
    newSize: "L",
    reason: "Size too small",
    status: "Pending",
    approvedBy: "",
    approvalDate: "",
  },
]

export const getExchangeOrders = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: exchangeOrderData }
}

export const getExchangeOrderById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const order = exchangeOrderData.find((o) => o.id === id)
  return order ? { success: true, data: order } : { success: false, error: "Exchange order not found" }
}

export const createExchangeOrder = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `EXO${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newOrder = {
    id: newId,
    ...data,
    orderDate: new Date().toISOString().split("T")[0],
    status: "Pending",
    approvedBy: "",
    approvalDate: "",
  }
  exchangeOrderData.push(newOrder)
  return { success: true, data: newOrder }
}

export const updateExchangeOrder = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = exchangeOrderData.findIndex((o) => o.id === id)
  if (index === -1) {
    return { success: false, error: "Exchange order not found" }
  }
  exchangeOrderData[index] = { ...exchangeOrderData[index], ...data }
  return { success: true, data: exchangeOrderData[index] }
}

export const deleteExchangeOrder = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = exchangeOrderData.findIndex((o) => o.id === id)
  if (index === -1) {
    return { success: false, error: "Exchange order not found" }
  }
  exchangeOrderData.splice(index, 1)
  return { success: true }
}

// Purchase Order API functions
const purchaseOrderData = [
  {
    id: "PO001",
    orderDate: "2023-04-10",
    vendorName: "ABC Supplies",
    vendorContact: "9876543210",
    items: [
      { name: "School Uniform", quantity: 50, unitPrice: 500, totalPrice: 25000 },
      { name: "School Bag", quantity: 30, unitPrice: 800, totalPrice: 24000 },
    ],
    totalAmount: 49000,
    status: "Pending",
    approvedBy: "",
    approvalDate: "",
    deliveryDate: "2023-04-20",
  },
  {
    id: "PO002",
    orderDate: "2023-04-09",
    vendorName: "XYZ Stationers",
    vendorContact: "8765432109",
    items: [
      { name: "Notebooks", quantity: 100, unitPrice: 50, totalPrice: 5000 },
      { name: "Pencils", quantity: 200, unitPrice: 10, totalPrice: 2000 },
      { name: "Erasers", quantity: 100, unitPrice: 5, totalPrice: 500 },
    ],
    totalAmount: 7500,
    status: "Approved",
    approvedBy: "Admin",
    approvalDate: "2023-04-11",
    deliveryDate: "2023-04-15",
  },
  {
    id: "PO003",
    orderDate: "2023-04-08",
    vendorName: "PQR Books",
    vendorContact: "7654321098",
    items: [
      { name: "Textbooks", quantity: 50, unitPrice: 300, totalPrice: 15000 },
      { name: "Workbooks", quantity: 50, unitPrice: 150, totalPrice: 7500 },
    ],
    totalAmount: 22500,
    status: "Delivered",
    approvedBy: "Admin",
    approvalDate: "2023-04-10",
    deliveryDate: "2023-04-12",
  },
  {
    id: "PO004",
    orderDate: "2023-04-07",
    vendorName: "LMN Sports",
    vendorContact: "6543210987",
    items: [
      { name: "Sports Equipment", quantity: 10, unitPrice: 1000, totalPrice: 10000 },
      { name: "Sports Uniform", quantity: 20, unitPrice: 600, totalPrice: 12000 },
    ],
    totalAmount: 22000,
    status: "Cancelled",
    approvedBy: "Admin",
    approvalDate: "2023-04-09",
    deliveryDate: "",
  },
  {
    id: "PO005",
    orderDate: "2023-04-06",
    vendorName: "DEF Electronics",
    vendorContact: "5432109876",
    items: [
      { name: "Projector", quantity: 2, unitPrice: 25000, totalPrice: 50000 },
      { name: "Speakers", quantity: 5, unitPrice: 2000, totalPrice: 10000 },
    ],
    totalAmount: 60000,
    status: "Pending",
    approvedBy: "",
    approvalDate: "",
    deliveryDate: "2023-04-25",
  },
]

export const getPurchaseOrders = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: purchaseOrderData }
}

export const getPurchaseOrderById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const order = purchaseOrderData.find((o) => o.id === id)
  return order ? { success: true, data: order } : { success: false, error: "Purchase order not found" }
}

export const createPurchaseOrder = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `PO${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newOrder = {
    id: newId,
    ...data,
    orderDate: new Date().toISOString().split("T")[0],
    status: "Pending",
    approvedBy: "",
    approvalDate: "",
  }
  purchaseOrderData.push(newOrder)
  return { success: true, data: newOrder }
}

export const updatePurchaseOrder = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = purchaseOrderData.findIndex((o) => o.id === id)
  if (index === -1) {
    return { success: false, error: "Purchase order not found" }
  }
  purchaseOrderData[index] = { ...purchaseOrderData[index], ...data }
  return { success: true, data: purchaseOrderData[index] }
}

export const deletePurchaseOrder = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = purchaseOrderData.findIndex((o) => o.id === id)
  if (index === -1) {
    return { success: false, error: "Purchase order not found" }
  }
  purchaseOrderData.splice(index, 1)
  return { success: true }
}

// Static Data API functions
const staticDataCategories = [
  {
    id: "CAT001",
    name: "Academic Year",
    items: [
      { id: "AY001", name: "2022-23", isActive: false },
      { id: "AY002", name: "2023-24", isActive: true },
      { id: "AY003", name: "2024-25", isActive: false },
    ],
  },
  {
    id: "CAT002",
    name: "Programs",
    items: [
      { id: "PRG001", name: "Play Group", isActive: true },
      { id: "PRG002", name: "Nursery", isActive: true },
      { id: "PRG003", name: "Euro Junior", isActive: true },
      { id: "PRG004", name: "Euro Senior", isActive: true },
    ],
  },
  {
    id: "CAT003",
    name: "Fee Types",
    items: [
      { id: "FT001", name: "Registration Fee", isActive: true },
      { id: "FT002", name: "Term Fee", isActive: true },
      { id: "FT003", name: "Tuition Fee", isActive: true },
      { id: "FT004", name: "Uniform Fee", isActive: true },
      { id: "FT005", name: "Transportation Fee", isActive: true },
    ],
  },
  {
    id: "CAT004",
    name: "Discount Types",
    items: [
      { id: "DT001", name: "Sibling Discount", isActive: true },
      { id: "DT002", name: "Staff Discount", isActive: true },
      { id: "DT003", name: "Early Bird Discount", isActive: true },
      { id: "DT004", name: "Special Discount", isActive: true },
    ],
  },
  {
    id: "CAT005",
    name: "Enquiry Sources",
    items: [
      { id: "ES001", name: "Website", isActive: true },
      { id: "ES002", name: "Social Media", isActive: true },
      { id: "ES003", name: "Referral", isActive: true },
      { id: "ES004", name: "Google", isActive: true },
      { id: "ES005", name: "Exhibition", isActive: true },
      { id: "ES006", name: "Newspaper", isActive: true },
      { id: "ES007", name: "TV Ad", isActive: true },
      { id: "ES008", name: "Direct Walk-in", isActive: true },
    ],
  },
]

export const getStaticDataCategories = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: staticDataCategories }
}

export const getStaticDataByCategoryId = async (categoryId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const category = staticDataCategories.find((c) => c.id === categoryId)
  return category ? { success: true, data: category } : { success: false, error: "Category not found" }
}

export const createStaticDataCategory = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `CAT${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newCategory = {
    id: newId,
    ...data,
    items: [],
  }
  staticDataCategories.push(newCategory)
  return { success: true, data: newCategory }
}

export const addStaticDataItem = async (categoryId: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const categoryIndex = staticDataCategories.findIndex((c) => c.id === categoryId)
  if (categoryIndex === -1) {
    return { success: false, error: "Category not found" }
  }

  const itemPrefix = categoryId.substring(0, 3)
  const newItemId = `${itemPrefix}${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newItem = {
    id: newItemId,
    name: data.name,
    isActive: data.isActive || true,
  }

  staticDataCategories[categoryIndex].items.push(newItem)
  return { success: true, data: newItem }
}

export const updateStaticDataItem = async (categoryId: string, itemId: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const categoryIndex = staticDataCategories.findIndex((c) => c.id === categoryId)
  if (categoryIndex === -1) {
    return { success: false, error: "Category not found" }
  }

  const itemIndex = staticDataCategories[categoryIndex].items.findIndex((i) => i.id === itemId)
  if (itemIndex === -1) {
    return { success: false, error: "Item not found" }
  }

  staticDataCategories[categoryIndex].items[itemIndex] = {
    ...staticDataCategories[categoryIndex].items[itemIndex],
    ...data,
  }
  return { success: true, data: staticDataCategories[categoryIndex].items[itemIndex] }
}

export const deleteStaticDataItem = async (categoryId: string, itemId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const categoryIndex = staticDataCategories.findIndex((c) => c.id === categoryId)
  if (categoryIndex === -1) {
    return { success: false, error: "Category not found" }
  }

  const itemIndex = staticDataCategories[categoryIndex].items.findIndex((i) => i.id === itemId)
  if (itemIndex === -1) {
    return { success: false, error: "Item not found" }
  }

  staticDataCategories[categoryIndex].items.splice(itemIndex, 1)
  return { success: true }
}

// SOA (Statement of Account) API functions
const soaSummaryData = [
  {
    id: "SOA001",
    studentId: "STU1001",
    studentName: "John Smith",
    course: "Computer Science",
    batch: "2023-24",
    totalAmount: 75000,
    paidAmount: 75000,
    dueAmount: 0,
    lastPaymentDate: "2023-03-15",
    status: "Paid",
  },
  {
    id: "SOA002",
    studentId: "STU1002",
    studentName: "Sarah Johnson",
    course: "Business Administration",
    batch: "2023-24",
    totalAmount: 65000,
    paidAmount: 40000,
    dueAmount: 25000,
    lastPaymentDate: "2023-02-20",
    status: "Partial",
  },
  {
    id: "SOA003",
    studentId: "STU1003",
    studentName: "Michael Brown",
    course: "Electrical Engineering",
    batch: "2023-24",
    totalAmount: 80000,
    paidAmount: 0,
    dueAmount: 80000,
    lastPaymentDate: "",
    status: "Pending",
  },
  {
    id: "SOA004",
    studentId: "STU1004",
    studentName: "Emily Davis",
    course: "Psychology",
    batch: "2023-24",
    totalAmount: 60000,
    paidAmount: 60000,
    dueAmount: 0,
    lastPaymentDate: "2023-01-10",
    status: "Paid",
  },
  {
    id: "SOA005",
    studentId: "STU1005",
    studentName: "David Wilson",
    course: "Mechanical Engineering",
    batch: "2023-24",
    totalAmount: 80000,
    paidAmount: 80000,
    dueAmount: 0,
    lastPaymentDate: "2023-03-05",
    status: "Paid",
  },
]

const soaDetailsData = [
  {
    id: "SOAD001",
    soaId: "SOA001",
    studentId: "STU1001",
    studentName: "John Smith",
    transactions: [
      {
        id: "TRX001",
        date: "2023-01-15",
        description: "Registration Fee",
        amount: 10000,
        type: "Debit",
      },
      {
        id: "TRX002",
        date: "2023-01-15",
        description: "Term Fee",
        amount: 15000,
        type: "Debit",
      },
      {
        id: "TRX003",
        date: "2023-01-15",
        description: "Tuition Fee",
        amount: 50000,
        type: "Debit",
      },
      {
        id: "TRX004",
        date: "2023-01-15",
        description: "Payment - Online",
        amount: 75000,
        type: "Credit",
      },
    ],
  },
  {
    id: "SOAD002",
    soaId: "SOA002",
    studentId: "STU1002",
    studentName: "Sarah Johnson",
    transactions: [
      {
        id: "TRX005",
        date: "2023-01-20",
        description: "Registration Fee",
        amount: 10000,
        type: "Debit",
      },
      {
        id: "TRX006",
        date: "2023-01-20",
        description: "Term Fee",
        amount: 15000,
        type: "Debit",
      },
      {
        id: "TRX007",
        date: "2023-01-20",
        description: "Tuition Fee",
        amount: 40000,
        type: "Debit",
      },
      {
        id: "TRX008",
        date: "2023-02-20",
        description: "Payment - Cheque",
        amount: 40000,
        type: "Credit",
      },
    ],
  },
]

export const getSOASummary = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: soaSummaryData }
}

export const getSOADetails = async (soaId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const details = soaDetailsData.find((d) => d.soaId === soaId)
  return details ? { success: true, data: details } : { success: false, error: "SOA details not found" }
}

// Franchise API functions
const franchiseInvoiceData = [
  {
    id: "INV001",
    franchiseId: "FRN001",
    franchiseName: "EuroKids Andheri",
    invoiceDate: "2023-04-10",
    dueDate: "2023-05-10",
    amount: 50000,
    status: "Paid",
    paymentDate: "2023-04-25",
    paymentMethod: "Online",
    transactionId: "TXN78945612",
  },
  {
    id: "INV002",
    franchiseId: "FRN002",
    franchiseName: "EuroKids Bandra",
    invoiceDate: "2023-04-09",
    dueDate: "2023-05-09",
    amount: 45000,
    status: "Pending",
    paymentDate: "",
    paymentMethod: "",
    transactionId: "",
  },
  {
    id: "INV003",
    franchiseId: "FRN003",
    franchiseName: "EuroKids Juhu",
    invoiceDate: "2023-04-08",
    dueDate: "2023-05-08",
    amount: 55000,
    status: "Paid",
    paymentDate: "2023-04-20",
    paymentMethod: "Cheque",
    transactionId: "CHQ123456",
  },
  {
    id: "INV004",
    franchiseId: "FRN004",
    franchiseName: "EuroKids Malad",
    invoiceDate: "2023-04-07",
    dueDate: "2023-05-07",
    amount: 40000,
    status: "Overdue",
    paymentDate: "",
    paymentMethod: "",
    transactionId: "",
  },
  {
    id: "INV005",
    franchiseId: "FRN005",
    franchiseName: "EuroKids Dadar",
    invoiceDate: "2023-04-06",
    dueDate: "2023-05-06",
    amount: 60000,
    status: "Paid",
    paymentDate: "2023-04-15",
    paymentMethod: "Online",
    transactionId: "TXN78945613",
  },
]

const franchiseHolderData = [
  {
    id: "FRN001",
    name: "Andheri Franchise",
    ownerName: "Rajesh Mehta",
    contactNumber: "9876543210",
    email: "rajesh.mehta@example.com",
    address: "123, ABC Colony, Andheri East, Mumbai",
    startDate: "2020-06-15",
    status: "Active",
    franchiseType: "Premium",
  },
  {
    id: "FRN002",
    name: "Bandra Franchise",
    ownerName: "Priya Sharma",
    contactNumber: "8765432109",
    email: "priya.sharma@example.com",
    address: "456, XYZ Society, Bandra West, Mumbai",
    startDate: "2019-08-10",
    status: "Active",
    franchiseType: "Standard",
  },
  {
    id: "FRN003",
    name: "Juhu Franchise",
    ownerName: "Amit Patel",
    contactNumber: "7654321098",
    email: "amit.patel@example.com",
    address: "789, PQR Apartments, Juhu, Mumbai",
    startDate: "2021-02-20",
    status: "Active",
    franchiseType: "Premium",
  },
  {
    id: "FRN004",
    name: "Malad Franchise",
    ownerName: "Neha Singh",
    contactNumber: "6543210987",
    email: "neha.singh@example.com",
    address: "101, LMN Heights, Malad West, Mumbai",
    startDate: "2018-11-05",
    status: "Active",
    franchiseType: "Standard",
  },
  {
    id: "FRN005",
    name: "Dadar Franchise",
    ownerName: "Vikram Joshi",
    contactNumber: "5432109876",
    email: "vikram.joshi@example.com",
    address: "202, DEF Road, Dadar, Mumbai",
    startDate: "2022-01-10",
    status: "Active",
    franchiseType: "Premium",
  },
]

export const getFranchiseInvoices = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: franchiseInvoiceData }
}

export const getFranchiseHolders = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: franchiseHolderData }
}

export const getFranchiseById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const franchise = franchiseHolderData.find((f) => f.id === id)
  return franchise ? { success: true, data: franchise } : { success: false, error: "Franchise not found" }
}

export const createFranchise = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `FRN${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newFranchise = {
    id: newId,
    ...data,
    startDate: new Date().toISOString().split("T")[0],
    status: "Active",
  }
  franchiseHolderData.push(newFranchise)
  return { success: true, data: newFranchise }
}

export const updateFranchise = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = franchiseHolderData.findIndex((f) => f.id === id)
  if (index === -1) {
    return { success: false, error: "Franchise not found" }
  }
  franchiseHolderData[index] = { ...franchiseHolderData[index], ...data }
  return { success: true, data: franchiseHolderData[index] }
}

export const deleteFranchise = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = franchiseHolderData.findIndex((f) => f.id === id)
  if (index === -1) {
    return { success: false, error: "Franchise not found" }
  }
  franchiseHolderData.splice(index, 1)
  return { success: true }
}

// User authentication functions
export const loginUser = async (credentials: { username: string; password: string; institute: string }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock authentication - in a real app this would validate against a database
  if (credentials.username === "admin" && credentials.password === "password") {
    return {
      success: true,
      data: {
        id: "USR001",
        name: "Vinit Bari",
        role: "ERP Office",
        token: "mock-jwt-token",
      },
    }
  }

  return { success: false, error: "Invalid credentials" }
}

export const registerUser = async (userData: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1200))

  // Mock registration - in a real app this would create a user in the database
  return {
    success: true,
    data: {
      id: `USR${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(3, "0")}`,
      name: userData.name,
      email: userData.email,
      role: "User",
      token: "mock-jwt-token",
    },
  }
}

export const getUserProfile = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  return {
    success: true,
    data: {
      id: "USR001",
      name: "Vinit Bari",
      email: "vinit.bari@example.com",
      role: "ERP Office",
      institute: "Institute One",
      phone: "9876543210",
      lastLogin: "2023-04-14T10:30:00Z",
    },
  }
}

export const updateUserProfile = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    success: true,
    data: {
      id: "USR001",
      name: data.name || "Vinit Bari",
      email: data.email || "vinit.bari@example.com",
      role: "ERP Office",
      institute: data.institute || "Institute One",
      phone: data.phone || "9876543210",
      lastLogin: "2023-04-14T10:30:00Z",
    },
  }
}

// Staff Assessment API functions
const staffAssessmentData = [
  {
    id: "SA001",
    staffId: "STF001",
    staffName: "Priya Sharma",
    designation: "Teacher",
    department: "Pre-Primary",
    assessmentDate: "2023-04-10",
    assessmentType: "Quarterly",
    overallRating: 4.5,
    strengths: "Excellent communication skills, strong classroom management",
    areasOfImprovement: "Needs to focus on individual student needs",
    actionPlan: "Attend training on personalized learning",
    assessor: "Admin",
    assessorComments: "Overall a very good teacher",
    staffComments: "Will work on the feedback",
    status: "Completed",
    criteria: [
      { name: "Classroom Management", rating: 4, comments: "Good control over the class" },
      { name: "Communication Skills", rating: 5, comments: "Excellent communication with students and parents" },
      { name: "Subject Knowledge", rating: 4, comments: "Strong understanding of the subject" },
      { name: "Student Engagement", rating: 4, comments: "Engages students well in class activities" },
    ],
  },
  {
    id: "SA002",
    staffId: "STF002",
    name: "Rajesh Kumar",
    designation: "Teacher",
    department: "Primary",
    assessmentDate: "2023-04-09",
    assessmentType: "Annual",
    overallRating: 3.8,
    strengths: "Good subject knowledge, punctual",
    areasOfImprovement: "Needs to improve classroom management",
    actionPlan: "Attend training on classroom management techniques",
    assessor: "Admin",
    assessorComments: "Needs to work on engaging students",
    staffComments: "Will attend the training",
    status: "Completed",
    criteria: [
      { name: "Classroom Management", rating: 3, comments: "Needs improvement" },
      { name: "Communication Skills", rating: 4, comments: "Good communication with students" },
      { name: "Subject Knowledge", rating: 4, comments: "Strong understanding of the subject" },
      { name: "Student Engagement", rating: 4, comments: "Engages students well in class activities" },
    ],
  },
]

export const getStaffAssessments = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: staffAssessmentData }
}

export const getStaffAssessmentById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const assessment = staffAssessmentData.find((s) => s.id === id)
  return assessment ? { success: true, data: assessment } : { success: false, error: "Assessment not found" }
}
