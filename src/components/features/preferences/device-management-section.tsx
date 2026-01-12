"use client"

import { useState } from "react"
import { Smartphone, Monitor } from "lucide-react"

interface Device {
  id: string
  name: string
  type: "mobile" | "desktop"
  location: string
  lastLogin: string
  isCurrent?: boolean
}

const devices: Device[] = [
  {
    id: "1",
    name: "Apple iPhone 13",
    type: "mobile",
    location: "Location: Lagos, Nigeria • 102.89.68.30",
    lastLogin: "Last login: 20th Apr 2025, 04:40 PM",
    isCurrent: true,
  },
  {
    id: "2",
    name: "Chrome V122.0.0 • Windows",
    type: "desktop",
    location: "Location: Lagos, Nigeria • 102.89.68.30",
    lastLogin: "Last login: 20th Apr 2025, 04:40 PM",
  },
  {
    id: "3",
    name: "Edge V133.0.0 • Windows",
    type: "desktop",
    location: "Location: Lagos, Nigeria • 102.89.68.30",
    lastLogin: "Last login: 20th Apr 2025, 04:40 PM",
  },
]

export function DeviceManagementSection() {
  const [deviceList, setDeviceList] = useState(devices)

  const handleRemoveDevice = (deviceId: string) => {
    setDeviceList((prev) => prev.filter((device) => device.id !== deviceId))
  }

  return (
    <div className="bg-white rounded-lg p-6 space-y-4">
      <div>
        <h2 className="text-lg font-medium">Device Management</h2>
        <p className="text-sm text-gray-500">
          See all devices that have logged into your account. Remove any for added security.
        </p>
      </div>

      <div className="space-y-3">
        {deviceList.map((device) => (
          <div key={device.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                {device.type === "mobile" ? (
                  <Smartphone className="h-5 w-5 text-purple-600" />
                ) : (
                  <Monitor className="h-5 w-5 text-purple-600" />
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{device.name}</span>
                  {device.isCurrent && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                      Current device
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{device.location}</p>
                <p className="text-sm text-gray-500">{device.lastLogin}</p>
              </div>
            </div>

            {!device.isCurrent && (
              <button
                onClick={() => handleRemoveDevice(device.id)}
                className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 rounded hover:bg-red-50 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}