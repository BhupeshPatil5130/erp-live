"use client"

import type React from "react"

import { useSidebar } from "@/components/sidebar-provider"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Building,
  ChevronDown,
  ClipboardList,
  DollarSign,
  FileText,
  Home,
  Package,
  Settings,
  Users,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent } from "@/components/ui/sheet"

type SidebarItem = {
  title: string
  href?: string
  icon: React.ElementType
  submenu?: SidebarSubItem[]
}

type SidebarSubItem = {
  title: string
  href: string
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Enrollment",
    icon: BookOpen,
    submenu: [
      { title: "Enquiry", href: "/dashboard/enrollment/enquiry" },
      { title: "Leadersquare Enquiry", href: "/dashboard/enrollment/lsq-enquiry" },
      { title: "Admission", href: "/dashboard/enrollment/admission" },
      { title: "Manage Transfer Stage", href: "/dashboard/enrollment/transfer-stage" },
      { title: "DTP View", href: "/dashboard/enrollment/dtp-view" },
      { title: "Graduation Name Changed Confirmation", href: "/dashboard/enrollment/graduation-name-change" },
      { title: "Inventory/Purchase Order", href: "/dashboard/enrollment/inventory" },
      { title: "Admission Status", href: "/dashboard/enrollment/admission-status" },
    ],
  },
  {
    title: "Staff Assessment",
    icon: Users,
    submenu: [
      { title: "Staff Attendance", href: "/dashboard/staff/attendance" },
      { title: "Staff Details", href: "/dashboard/staff/details" },
      { title: "Teaching Subject", href: "/dashboard/staff/teaching-subject" },
    ],
  },
  {
    title: "Operation",
    icon: Settings,
    submenu: [
      { title: "Exchange Order", href: "/dashboard/operation/exchange-order" },
      { title: "Purchase Order", href: "/dashboard/operation/purchase-order" },
      { title: "Static Data", href: "/dashboard/operation/static-data" },
    ],
  },
  {
    title: "Account Statement",
    icon: FileText,
    submenu: [
      { title: "SOA Summary", href: "/dashboard/account/soa-summary" },
      { title: "SOA Details", href: "/dashboard/account/soa-details" },
    ],
  },
  {
    title: "Fee Collection",
    icon: DollarSign,
    submenu: [
      { title: "Deposit Amount", href: "/dashboard/fee/deposit-amount" },
      { title: "Deposit Status", href: "/dashboard/fee/deposit-status" },
      { title: "Fund Transfer", href: "/dashboard/fee/fund-transfer" },
      { title: "Fee Structure", href: "/dashboard/fee/structure" },
      { title: "Discount Type", href: "/dashboard/fee/discount-type" },
      { title: "Payment Detail", href: "/dashboard/fee/payment-detail" },
      { title: "Convert Amount", href: "/dashboard/fee/convert-amount" },
    ],
  },
  {
    title: "Franchise",
    icon: Building,
    submenu: [
      { title: "Invoice Details", href: "/dashboard/franchise/invoice-details" },
      { title: "Invoice Download", href: "/dashboard/franchise/invoice-download" },
      { title: "Receipt Dashboard", href: "/dashboard/franchise/receipt-dashboard" },
      { title: "Franchise Holder", href: "/dashboard/franchise/holder" },
      { title: "Franchise Profile", href: "/dashboard/franchise/profile" },
      { title: "Franchise Type", href: "/dashboard/franchise/type" },
    ],
  },
  {
    title: "Tools",
    icon: Settings,
    submenu: [
      { title: "Fee Calculator", href: "/dashboard/tools/fee-calculator" },
      { title: "Calendar", href: "/dashboard/tools/calendar" },
      { title: "Academic", href: "/dashboard/tools/academic" },
    ],
  },
  {
    title: "Reports",
    icon: ClipboardList,
    submenu: [
      { title: "Admission Details", href: "/dashboard/reports/admission-details" },
      { title: "Fee Card Details", href: "/dashboard/reports/fee-card-details" },
      { title: "Enquiry Details", href: "/dashboard/reports/enquiry-details" },
      { title: "LSQ Enquiry Detail", href: "/dashboard/reports/lsq-enquiry-details" },
      { title: "Payment Due Reports", href: "/dashboard/reports/payment-due" },
      { title: "Cancelled Receipt Details", href: "/dashboard/reports/cancelled-receipt" },
      { title: "Transferred Student Report", href: "/dashboard/reports/transferred-student" },
      { title: "FCR", href: "/dashboard/reports/fcr" },
      { title: "Admission Count", href: "/dashboard/reports/admission-count" },
      { title: "Student Forecasted Royalty Report", href: "/dashboard/reports/forecasted-royalty" },
    ],
  },
  {
    title: "Shortage/Damage",
    icon: Package,
    submenu: [
      { title: "Report Shortage", href: "/dashboard/shortage/report" },
      { title: "Damage Shortage", href: "/dashboard/shortage/damage" },
      { title: "Download Shortage/Damage Report", href: "/dashboard/shortage/download-report" },
    ],
  },
]

export function MainSidebar() {
  const { isOpen, setIsOpen, isMobile } = useSidebar()
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href
  }

  const sidebar = (
    <>
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          {/* <Building className="h-6 w-6" /> */}
          <span className={cn("font-bold", !isOpen && "hidden")}><img src="/Suryadhi learning_light.png" alt=""/></span>
        </Link>
        {isMobile && (
          <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 py-2">
          {sidebarItems.map((item, index) => {
            if (!item.submenu) {
              return (
                <Link
                  key={index}
                  href={item.href || "#"}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    isActive(item.href || "") && "bg-accent text-accent-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className={cn("", !isOpen && "hidden")}>{item.title}</span>
                </Link>
              )
            }

            return (
              <Accordion key={index} type="single" collapsible className="border-none">
                <AccordionItem value={item.title} className="border-none">
                  <AccordionTrigger
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground no-underline",
                      !isOpen && "justify-center",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className={cn("", !isOpen && "hidden")}>{item.title}</span>
                 
                  </AccordionTrigger>
                  <AccordionContent className={cn(!isOpen && "hidden")}>
                    <div className="pl-4 pt-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                            isActive(subItem.href) && "bg-accent text-accent-foreground",
                          )}
                        >
                          <span>{subItem.title}</span>
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          })}
        </div>
      </ScrollArea>
    </>
  )

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <div className="flex flex-col h-full">{sidebar}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-background",
        isOpen ? "w-64" : "w-[70px]",
        "transition-width duration-300",
      )}
    > 
      {sidebar}
      <div>
        <h1 className='text-sm font-italic px-5'>@Powered by SoftSkiller </h1>
        </div>
    </div>
  )
}
