"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

interface DateTimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  placeholder?: string
}

export function DateTimePicker({ date, setDate, placeholder = "Pick a date" }: DateTimePickerProps) {
  const [selectedTime, setSelectedTime] = React.useState<string>(
    date ? format(date, "HH:mm") : ""
  )

  const handleTimeChange = (time: string) => {
    setSelectedTime(time)
    if (date) {
      const [hours, minutes] = time.split(":")
      const newDate = new Date(date)
      newDate.setHours(parseInt(hours), parseInt(minutes))
      setDate(newDate)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP HH:mm") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            if (newDate) {
              const [hours, minutes] = selectedTime.split(":")
              newDate.setHours(hours ? parseInt(hours) : 0, minutes ? parseInt(minutes) : 0)
              setDate(newDate)
            } else {
              setDate(undefined)
            }
          }}
          initialFocus
        />
        <div className="p-3 border-t border-border">
          <Input
            type="time"
            value={selectedTime}
            onChange={(e) => handleTimeChange(e.target.value)}
            className="w-full"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
} 