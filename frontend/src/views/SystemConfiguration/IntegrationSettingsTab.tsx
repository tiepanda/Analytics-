'use client'

import React, { useState } from 'react'
import { Input } from '@src/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@src/components/ui/select'
import { Save, Plug, Key, TestTube, Wifi, Server, Webhook, CheckCircle2 } from 'lucide-react'

interface IntegrationSettingsData {
    enableRestAPI: boolean
    apiBaseURL: string
    apiVersion: string
    enableRateLimiting: boolean
    requestsPerMinute: number
    burstLimit: number
    enableMQTT: boolean
    mqttBrokerURL: string
    mqttPort: number
    mqttUsername: string
    mqttPassword: string
    qosLevel: '0' | '1' | '2'
    keepAlive: number
    enableModbus: boolean
    modbusGatewayIP: string
    modbusPort: number
    enableOPCUA: boolean
    opcuaServerURL: string
    securityMode: 'None' | 'Sign' | 'SignAndEncrypt'
    erpSystem: 'SAP' | 'Oracle' | 'Custom'
    erpAPIEndpoint: string
    erpAPIKey: string
    erpSyncFrequency: 'Real-time' | 'Hourly' | 'Daily'
    mesSystem: 'Siemens' | 'Rockwell' | 'Custom'
    mesConnectionString: string
    enableWebhooks: boolean
    webhookEvents: string[]
    webhookURL: string
    webhookAuthentication: 'None' | 'Bearer Token' | 'API Key'
    retryOnFailure: boolean
    maxRetries: number
}

const IntegrationSettingsTab = () => {
    const [formData, setFormData] = useState<IntegrationSettingsData>({
        enableRestAPI: true,
        apiBaseURL: 'https://yourdomain.com/api',
        apiVersion: 'v1',
        enableRateLimiting: true,
        requestsPerMinute: 1000,
        burstLimit: 100,
        enableMQTT: false,
        mqttBrokerURL: '',
        mqttPort: 1883,
        mqttUsername: '',
        mqttPassword: '',
        qosLevel: '1',
        keepAlive: 60,
        enableModbus: false,
        modbusGatewayIP: '',
        modbusPort: 502,
        enableOPCUA: false,
        opcuaServerURL: '',
        securityMode: 'SignAndEncrypt',
        erpSystem: 'SAP',
        erpAPIEndpoint: '',
        erpAPIKey: '',
        erpSyncFrequency: 'Hourly',
        mesSystem: 'Siemens',
        mesConnectionString: '',
        enableWebhooks: false,
        webhookEvents: [],
        webhookURL: '',
        webhookAuthentication: 'Bearer Token',
        retryOnFailure: true,
        maxRetries: 3,
    })

    const [isSaving, setIsSaving] = useState(false)
    const [isTesting, setIsTesting] = useState(false)

    const updateField = (field: keyof IntegrationSettingsData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSave = async () => {
        setIsSaving(true)
        console.log('Saving integration settings:', formData)
        setTimeout(() => {
            setIsSaving(false)
            alert('Integration settings saved successfully')
        }, 1000)
    }

    const handleTestConnection = async () => {
        setIsTesting(true)
        setTimeout(() => {
            setIsTesting(false)
            alert('Connection test successful')
        }, 1000)
    }

    const webhookEventOptions = [
        'User Created',
        'Company Created',
        'License Expired',
        'Production Completed',
        'Machine Alert',
        'Custom Events',
    ]

    return (
        <>
            {/* API Configuration Card */}
            <div className="col-span-12 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-blue-500 rounded-md bg-blue-500/10 size-12">
                            <Plug className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">API Configuration</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure REST API and rate limiting
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.enableRestAPI}
                                onChange={(e) => updateField('enableRestAPI', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Enable REST API
                            </span>
                        </label>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                API Base URL
                            </label>
                            <Input value={formData.apiBaseURL} disabled className="bg-gray-50 dark:bg-dark-850" />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                API Version
                            </label>
                            <Input value={formData.apiVersion} disabled className="bg-gray-50 dark:bg-dark-850" />
                        </div>
                        <div className="md:col-span-2">
                            <a
                                href="#"
                                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400">
                                API Documentation (Swagger/OpenAPI)
                            </a>
                        </div>
                        <div className="md:col-span-2">
                            <button type="button" className="btn btn-sub-primary flex items-center gap-2">
                                <Key className="size-4" />
                                Generate API Key
                            </button>
                        </div>
                        <div className="md:col-span-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.enableRateLimiting}
                                    onChange={(e) => updateField('enableRateLimiting', e.target.checked)}
                                    className="form-checkbox"
                                />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Enable Rate Limiting
                                </span>
                            </label>
                        </div>
                        {formData.enableRateLimiting && (
                            <>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Requests per Minute
                                    </label>
                                    <Input
                                        type="number"
                                        value={formData.requestsPerMinute}
                                        onChange={(e) => updateField('requestsPerMinute', parseInt(e.target.value))}
                                        min={1}
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Burst Limit
                                    </label>
                                    <Input
                                        type="number"
                                        value={formData.burstLimit}
                                        onChange={(e) => updateField('burstLimit', parseInt(e.target.value))}
                                        min={1}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* IoT Device Protocols Card */}
            <div className="col-span-12 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-green-500 rounded-md bg-green-500/10 size-12">
                            <Wifi className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">IoT Device Protocols</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure MQTT, Modbus, and OPC-UA connections
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {/* MQTT Configuration */}
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-dark-700">
                            <div className="mb-4 flex items-center justify-between">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.enableMQTT}
                                        onChange={(e) => updateField('enableMQTT', e.target.checked)}
                                        className="form-checkbox"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Enable MQTT
                                    </span>
                                </label>
                            </div>
                            {formData.enableMQTT && (
                                <div className="space-y-3">
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                                            MQTT Broker URL
                                        </label>
                                        <Input
                                            value={formData.mqttBrokerURL}
                                            onChange={(e) => updateField('mqttBrokerURL', e.target.value)}
                                            placeholder="mqtt://broker.example.com"
                                            className="text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                                            MQTT Port
                                        </label>
                                        <Input
                                            type="number"
                                            value={formData.mqttPort}
                                            onChange={(e) => updateField('mqttPort', parseInt(e.target.value))}
                                            placeholder="1883"
                                            className="text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                                            QoS Level
                                        </label>
                                        <Select
                                            value={formData.qosLevel}
                                            onValueChange={(value: any) => updateField('qosLevel', value)}>
                                            <SelectTrigger className="h-9 text-sm">
                                                <SelectValue placeholder="Select QoS" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0">0</SelectItem>
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modbus TCP Configuration */}
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-dark-700">
                            <div className="mb-4 flex items-center justify-between">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.enableModbus}
                                        onChange={(e) => updateField('enableModbus', e.target.checked)}
                                        className="form-checkbox"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Enable Modbus
                                    </span>
                                </label>
                            </div>
                            {formData.enableModbus && (
                                <div className="space-y-3">
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                                            Modbus Gateway IP
                                        </label>
                                        <Input
                                            value={formData.modbusGatewayIP}
                                            onChange={(e) => updateField('modbusGatewayIP', e.target.value)}
                                            placeholder="192.168.1.100"
                                            className="text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                                            Modbus Port
                                        </label>
                                        <Input
                                            type="number"
                                            value={formData.modbusPort}
                                            onChange={(e) => updateField('modbusPort', parseInt(e.target.value))}
                                            placeholder="502"
                                            className="text-sm"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* OPC-UA Configuration */}
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-dark-700">
                            <div className="mb-4 flex items-center justify-between">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.enableOPCUA}
                                        onChange={(e) => updateField('enableOPCUA', e.target.checked)}
                                        className="form-checkbox"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Enable OPC-UA
                                    </span>
                                </label>
                            </div>
                            {formData.enableOPCUA && (
                                <div className="space-y-3">
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                                            OPC-UA Server URL
                                        </label>
                                        <Input
                                            value={formData.opcuaServerURL}
                                            onChange={(e) => updateField('opcuaServerURL', e.target.value)}
                                            placeholder="opc.tcp://server.example.com:4840"
                                            className="text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                                            Security Mode
                                        </label>
                                        <Select
                                            value={formData.securityMode}
                                            onValueChange={(value: any) => updateField('securityMode', value)}>
                                            <SelectTrigger className="h-9 text-sm">
                                                <SelectValue placeholder="Select mode" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="None">None</SelectItem>
                                                <SelectItem value="Sign">Sign</SelectItem>
                                                <SelectItem value="SignAndEncrypt">SignAndEncrypt</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Third-party Integrations Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-purple-500 rounded-md bg-purple-500/10 size-12">
                            <Server className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">Third-party Integrations</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure ERP and MES system connections
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-6">
                        {/* ERP Integration */}
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-dark-700">
                            <h6 className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                                ERP Integration
                            </h6>
                            <div className="space-y-3">
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                                        ERP System
                                    </label>
                                    <Select
                                        value={formData.erpSystem}
                                        onValueChange={(value: any) => updateField('erpSystem', value)}>
                                        <SelectTrigger className="h-9 text-sm">
                                            <SelectValue placeholder="Select ERP" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="SAP">SAP</SelectItem>
                                            <SelectItem value="Oracle">Oracle</SelectItem>
                                            <SelectItem value="Custom">Custom</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                                        API Endpoint
                                    </label>
                                    <Input
                                        value={formData.erpAPIEndpoint}
                                        onChange={(e) => updateField('erpAPIEndpoint', e.target.value)}
                                        placeholder="https://api.example.com"
                                        className="text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                                        Sync Frequency
                                    </label>
                                    <Select
                                        value={formData.erpSyncFrequency}
                                        onValueChange={(value: any) => updateField('erpSyncFrequency', value)}>
                                        <SelectTrigger className="h-9 text-sm">
                                            <SelectValue placeholder="Select frequency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Real-time">Real-time</SelectItem>
                                            <SelectItem value="Hourly">Hourly</SelectItem>
                                            <SelectItem value="Daily">Daily</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* MES Integration */}
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-dark-700">
                            <h6 className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                                MES Integration
                            </h6>
                            <div className="space-y-3">
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                                        MES System
                                    </label>
                                    <Select
                                        value={formData.mesSystem}
                                        onValueChange={(value: any) => updateField('mesSystem', value)}>
                                        <SelectTrigger className="h-9 text-sm">
                                            <SelectValue placeholder="Select MES" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Siemens">Siemens</SelectItem>
                                            <SelectItem value="Rockwell">Rockwell</SelectItem>
                                            <SelectItem value="Custom">Custom</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                                        Connection String
                                    </label>
                                    <Input
                                        value={formData.mesConnectionString}
                                        onChange={(e) => updateField('mesConnectionString', e.target.value)}
                                        placeholder="connection string"
                                        className="text-sm"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleTestConnection}
                                    disabled={isTesting}
                                    className="btn btn-sub-primary btn-sm flex items-center gap-2">
                                    <TestTube className="size-3" />
                                    {isTesting ? 'Testing...' : 'Test Connection'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Webhook Configuration Card */}
            <div className="col-span-12 xl:col-span-6 card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center text-orange-500 rounded-md bg-orange-500/10 size-12">
                            <Webhook className="size-5" />
                        </div>
                        <div>
                            <h6 className="card-title">Webhook Configuration</h6>
                            <p className="text-sm text-gray-500 dark:text-dark-500">
                                Configure webhook events and endpoints
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="space-y-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.enableWebhooks}
                                onChange={(e) => updateField('enableWebhooks', e.target.checked)}
                                className="form-checkbox"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Enable Webhooks
                            </span>
                        </label>
                        {formData.enableWebhooks && (
                            <>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Webhook Events
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {webhookEventOptions.map((event) => (
                                            <label key={event} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.webhookEvents.includes(event)}
                                                    onChange={(e) => {
                                                        const events = e.target.checked
                                                            ? [...formData.webhookEvents, event]
                                                            : formData.webhookEvents.filter((e) => e !== event)
                                                        updateField('webhookEvents', events)
                                                    }}
                                                    className="form-checkbox"
                                                />
                                                <span className="text-xs text-gray-700 dark:text-gray-300">{event}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Webhook URL
                                    </label>
                                    <Input
                                        value={formData.webhookURL}
                                        onChange={(e) => updateField('webhookURL', e.target.value)}
                                        placeholder="https://webhook.example.com"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Authentication
                                    </label>
                                    <Select
                                        value={formData.webhookAuthentication}
                                        onValueChange={(value: any) => updateField('webhookAuthentication', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select authentication" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="None">None</SelectItem>
                                            <SelectItem value="Bearer Token">Bearer Token</SelectItem>
                                            <SelectItem value="API Key">API Key</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.retryOnFailure}
                                            onChange={(e) => updateField('retryOnFailure', e.target.checked)}
                                            className="form-checkbox"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Retry on Failure</span>
                                    </label>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Max Retries
                                        </label>
                                        <Input
                                            type="number"
                                            value={formData.maxRetries}
                                            onChange={(e) => updateField('maxRetries', parseInt(e.target.value))}
                                            min={0}
                                            disabled={!formData.retryOnFailure}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Save Button Card */}
            <div className="col-span-12 card">
                <div className="card-body">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={isSaving}
                            className="btn btn-primary flex items-center gap-2">
                            <Save className="size-4" />
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IntegrationSettingsTab
