"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Home,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  FileSliders,
  SpellCheck,
  Gamepad2,
  Search,
  Clock,
  X,
  Check,
} from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogFooter, DialogHeader,  DialogTitle } from "@/components/ui/dialog"

const sidebarItems = [
  { icon: Home, label: "Dashboard", active: false },
  { icon: "", img: "assets/svg/student-icon.svg", label: "Students", active: false },
  { icon: "", img: "assets/svg/teachers-icon.svg", label: "Teachers", active: false },
  { icon: "", img: "assets/svg/classes-icon.svg", label: "Classes", active: false },
  { icon: SpellCheck, label: "Assessments", active: true },
  { icon: "", img: "assets/svg/lessons-icon.svg", label: "Lessons", active: false },
  { icon: Gamepad2, label: "Learning", active: false },
  { icon: CreditCard, label: "Fees & Payments", active: false },
  { icon: FileSliders, label: "Forms", active: false },
  { icon: Settings, label: "Settings", active: false },
]

const tabs = [
  { label: "Draft", active: false },
  { label: "Scheduled", active: false },
  { label: "Submitted", active: false },
  { label: "Reports", active: false },
  { label: "Previous", active: false },
  { label: "Timetable", active: true },
]

const timeSlots = [
  { start: "8:00", end: "8:30" },
  { start: "8:30", end: "9:00" },
  { start: "9:00", end: "9:30" },
  { start: "9:30", end: "10:00" },
  { start: "10:00", end: "10:30" },
  { start: "10:30", end: "11:00" },
]


const subjects = [
  "Mathematics",
  "English Language",
  "Civic Education",
  "French Language",
  "Agricultural Science",
  "Basic Technology",
]

const days = [
  { day: "Mon", date: "11" },
  { day: "Tue", date: "12" },
  { day: "Wed", date: "13" },
  { day: "Thu", date: "14" },
  { day: "Fri", date: "15" },
  { day: "Fri", date: "16" },
]

type DayKey = string;
type TimeKey = string;

type TimetableCell = { subject: string; color: string; isButton?: boolean } | null;

type TimetableRow = {
  [key in DayKey]: TimetableCell;
};

type TimetableData = {
  [key in TimeKey]: TimetableRow;
};

const timetableData: TimetableData = {
  "8:00-8:30": {
    Mon: { subject: "Civic Education", color: "bg-slate-300" },
    Tue: null,
    Wed: { subject: "English language", color: "bg-indigo-200" },
    Thu: null,
    Fri: null,
    Fri2: null,
  },
  "8:30-9:00": {
    Mon: { subject: "Civic Education", color: "bg-slate-300" },
    Tue: { subject: "Mathematics", color: "bg-slate-300" },
    Wed: { subject: "English language", color: "bg-indigo-200" },
    Thu: null,
    Fri: null,
    Fri2: { subject: "French Language", color: "bg-yellow-200" },
  },
  "9:00-9:30": {
    Mon: { subject: "Civic Education", color: "bg-slate-300" },
    Tue: { subject: "Mathematics", color: "bg-slate-300" },
    Wed: { subject: "English language", color: "bg-indigo-200" },
    Thu: null,
    Fri: { subject: "Agricultural Science", color: "bg-yellow-200" },
    Fri2: { subject: "French Language", color: "bg-yellow-200" },
  },
  "9:30-10:00": {
    Mon: { subject: "Civic Education", color: "bg-slate-300" },
    Tue: { subject: "Mathematics", color: "bg-slate-300" },
    Wed: { subject: "English language", color: "bg-indigo-200" },
    Thu: null,
    Fri: { subject: "Agricultural Science", color: "bg-yellow-200" },
    Fri2: { subject: "French Language", color: "bg-yellow-200" },
  },
  "10:00-10:30": {
    Mon: null,
    Tue: null,
    Wed: null,
    Thu: { subject: "Basic Technology", color: "bg-yellow-200" },
    Fri: { subject: "Agricultural Science", color: "bg-yellow-200" },
    Fri2: null,
  },
  "10:30-11:00": {
    Mon: null,
    Tue: null,
    Wed: null,
    Thu: { subject: "Basic Technology", color: "bg-yellow-200" },
    Fri: null,
    Fri2: null,
  },
}

export default function SchoolTimetable() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState("Mathematics")
  const [selectedDate, setSelectedDate] = useState("12-07-2025")
  const [startTime, setStartTime] = useState("8:30 AM")
  const [endTime, setEndTime] = useState("9:00 AM")
  const [selectedYear, setSelectedYear] = useState("2024")
  const [selectedMonth, setSelectedMonth] = useState("May")


  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 8; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const period = hour < 12 ? "AM" : "PM"
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
        slots.push(`${displayHour}:${minute.toString().padStart(2, "0")} ${period}`)
      }
    }
    return slots
  }

  const modalTimeSlots = generateTimeSlots()

  const handleSaveExam = () => {
    console.log({ selectedSubject, selectedDate, startTime, endTime })
    setIsModalOpen(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-60 bg-[#374258] text-white flex flex-col">
        <div className=" my-5 ms-3 relative w-[120px] h-10">
          <Image src="/assets/images/logo.png" alt="logo" fill />
        </div>
        <nav className="flex-1 px-2">
          {sidebarItems.map((item, index) => {
            const Icon = item?.icon
            return (
              <div
                key={index}
                className={`flex items-center px-4 py-4 text-sm cursor-pointer transition-colors my-2 rounded-sm ${item.active
                    ? "bg-[#078E58] text-white "
                    : "text-gray-300 hover:bg-slate-600 hover:text-white"
                  }`}
              >
                {item?.img && <Image src={item.img} alt="icon" width={18} height={18} className="mr-3" />}
                {item?.icon && <Icon className="w-5 h-5 mr-3" />}

                {item.label}
              </div>
            )
          })}
        </nav>
      </div>


      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        <div className="w-full flex items-center ps-3 pe-6 py-2 bg-white border-1 border-gray-200">
          <div className="flex items-center flex-1" >
            <Image src="/assets/images/borcelle-logo.png" alt="borcelle-logo" width="50" height="30" />
            <h5 className="text-sm font-medium">Borcelle Academy</h5>
          </div>
          <div className="flex items-center justify-end flex-1" >

            <button className="flex items-center bg-[#078E58] text-white text-sm px-2 py-2 rounded-md ml-4 hover:bg-green-600 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Create new
            </button>

            <div>
              <div className="flex items-center flex-1" >
                <Image src="/assets/images/borcelle-logo.png" alt="borcelle-logo" className="mx-3" width="50" height="30" />
                <div>
                  <h5 className="text-sm font-medium">Borcelle Academy</h5>
                  <p className="text-[12px] font-light">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center p-6">
          <div className="flex items-center flex-1" >
            <SpellCheck className="w-5 h-5 mr-3 text-[#B2BBCE]" />
            <h5 className="text-lg font-semibold">Assessment</h5>
          </div>
          <div className="flex items-center justify-end flex-1" >
            <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-1 w-[65%] hover:bg-gray-50">
              <Search className="w-4 h-4 text-gray-500" />
              <input type="search" placeholder="Search"
                className="w-full px-3 placeholder:text-gray-400 font-light text-sm h-7 bg-transparent outline-none"
              />
            </div>
            <button className="flex items-center bg-[#078E58] text-white text-sm px-4 py-2 rounded-md ml-4 hover:bg-green-600 transition-colors">
              <SpellCheck className="w-4 h-4 mr-2" />
              Create Assessment
            </button>
          </div>
        </div>

        {/* Header */}
        <div className=" p-6">
          <h1 className="text-md font-semibold text-gray-900 mb-4">Primary 3</h1>

          {/* Tabs */}
          <div className="flex space-x-8">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`pb-2 text-sm font-medium transition-colors ${tab.active ? "text-green-600 border-b-2 border-green-600" :
                    "text-gray-500 hover:text-green-600 hover:border-green-600"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timetable Content */}
        <div className="flex-1 p-6 bg-white border-b border-gray-200 mx-6 rounded-xl">
          {/* Timetable Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-medium text-gray-900">Exam timetable | Primary 3</h2>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm"
                  onClick={() => setSelectedYear((prev) => (parseInt(prev) - 1).toString())}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <Select value={selectedYear} onValueChange={setSelectedYear} >
                  <SelectTrigger className="w-15 bg-white border border-gray-300 hover:bg-gray-50" asChild={false}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300">
                    <SelectItem value="2024" className="hover:bg-gray-50">2024</SelectItem>
                    <SelectItem value="2025" className="hover:bg-gray-50">2025</SelectItem>
                    <SelectItem value="2026" className="hover:bg-gray-50">2026</SelectItem>
                    <SelectItem value="2027" className="hover:bg-gray-50">2027</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="sm"
                  onClick={() => setSelectedYear((prev) => (parseInt(prev) + 1).toString())}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <Select value={selectedMonth} onValueChange={setSelectedMonth} >
                <SelectTrigger className="w-24 bg-white border border-gray-300 hover:bg-gray-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300">
                  <SelectItem value="May" className="hover:bg-gray-50">May</SelectItem>
                  <SelectItem value="June" className="hover:bg-gray-50">June</SelectItem>
                  <SelectItem value="July" className="hover:bg-gray-50">July</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
                <Plus className="w-4 h-4 mr-2" />
                Add exam slot
              </Button>
              <Button variant="ghost" size="sm" className="border border-gray-300 hover:bg-gray-50 py-5">
                <Image src="assets/svg/expand-arrows-icon.svg" alt="expand-icon" width={20} height={20} />
              </Button>
            </div>
          </div>

          {/* Timetable Grid */}
          <Card className="border-0">
            <CardContent className="p-0">
              <div className="overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="bg-slate-600 text-white p-4 text-center font-medium w-32">Time</th>
                      {days.map((day, index) => (
                        <th key={index} className="bg-gray-50 p-4 text-center font-medium min-w-40">
                          <div className="text-sm text-gray-600">{day.day}</div>
                          <div className="text-2xl font-semibold text-gray-900">{day.date}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((slot, rowIndex) => {
                      const timeKey = `${slot?.start}-${slot?.end}`
                      return (
                        <tr key={rowIndex} className="border-b border-gray-200">
                          <td className="p-4 bg-gray-50 font-medium text-sm">
                            <div>
                              <span className="text-gray-900">{slot.start}</span>
                              <span className="text-xs text-gray-500 ml-1">AM</span>
                              <span className="mx-2">-</span>
                              <span className="text-gray-900">{slot.end}</span>
                              <span className="text-xs text-gray-500 ml-1">AM</span>
                            </div>
                          </td>
                          {days.map((day, colIndex) => {
                            const dayKey = colIndex === 5 ? "Fri2" : day.day
                            const cellData = timetableData[timeKey]?.[dayKey]

                            return (
                              <td key={colIndex} className="p-2 h-16">
                                {cellData ? (
                                  <div
                                    className={`w-full h-full rounded p-2 text-xs font-medium text-gray-800 flex items-center justify-center text-center ${cellData.color}`}
                                  >
                                    {cellData.subject}
                                  </div>
                                  // )
                                ) : (
                                  <div className="w-full h-full bg-gray-50 rounded relative group">

                                    <Button
                                      className="w-full h-full bg-green-100 text-green-700 border border-green-200 hover:bg-green-200
                                       invisible group-hover:visible"
                                      variant="outline"
                                      onClick={() => setIsModalOpen(true)}
                                    >
                                      <Plus className="w-4 h-4 mr-2" />
                                      Add Activity
                                    </Button>
                                  </div>
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl bg-[#F1F5F8] p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Create exam schedule</DialogTitle>
              <div className="flex justify-end mb-10">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="me-3 border-gray-300">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSaveExam} className="bg-[#078E58] text-white">
                  <Check className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">
                    Exams <span className="text-gray-500 px-2 py-1 rounded text-sm">3</span>
                  </h3>
                  <Button variant="outline" className="text-gray-500 bg-transparent">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Exam schedule
                  </Button>
                </div>

                <div className="bg-white p-6 shadow-sm rounded-lg my-15">

                  {/* Subject Selection */}
                  <div className="my-5">
                    <label htmlFor="subject" className="font-medium text-sm text-gray-600">Subject</label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger className="bg-white border-0 rounded-none border-b border-gray-300 outline-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-300">
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject} className="hover:bg-gray-50">
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date and Time Selection */}
                  <div className="flex gap-4 mt-10">
                    <div className=" my-2 w-1/3">
                      <label className="font-medium text-sm text-gray-600" htmlFor="date">Date</label><br/>
                        <input type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="pr-2 py-2 w-full bg-white border-0 rounded-none border-b border-gray-300 outline-none"
                        />
                    </div>

                    <div className=" my-2 w-1/3">
                      <label className="font-medium text-sm text-gray-600" htmlFor="startTime">Start Time</label>
                      <div className="relative">
                        <Select value={startTime} onValueChange={setStartTime} >
                          <SelectTrigger className="bg-white border-0 rounded-none border-b border-gray-300 outline-none">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-300">
                            {modalTimeSlots.map((time) => (
                              <SelectItem key={time} value={time} className="hover:bg-gray-50">
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Clock className="absolute right-8 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className=" my-2 w-1/3">
                      <label className="font-medium text-sm text-gray-600" htmlFor="endTime">Ending Time</label>
                      <div className="relative">
                        <Select value={endTime} onValueChange={setEndTime}>
                          <SelectTrigger className="bg-white border-0 rounded-none border-b border-gray-300 outline-none">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-300">
                            {modalTimeSlots.map((time) => (
                              <SelectItem key={time} value={time} className="hover:bg-gray-50">
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Clock className="absolute right-8 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex justify-between mt-10">
              <Button variant="outline" onClick={() => setIsModalOpen(false)} className="me-3 border-gray-300">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSaveExam} className="bg-[#078E58] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
      </Dialog>
    </div>
  )
}
