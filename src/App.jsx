import { useEffect, useMemo, useState } from 'react'
import { baseLines } from './yardData.js'
import {
  AlertCircle,
  Archive,
  ArrowRightLeft,
  BarChart3,
  Boxes,
  CheckCircle2,
  ChevronRight,
  Container,
  DoorClosed,
  DoorOpen,
  Globe2,
  LayoutGrid,
  Map,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  Warehouse,
  X,
} from 'lucide-react'

const translations = {
  en: {
    company: 'Salihem Al-Hajri Transport & Logistics',
    companyAr: 'صليهم الهاجري للنقليات',
    dashboard: 'Dashboard',
    gateIn: 'Gate-In Terminal',
    gateOut: 'Gate-Out Terminal',
    stock: 'Active Stock',
    archive: 'Archive',
    analytics: 'Analytics',
    yardMap: 'Yard Map',
    yardMapAr: 'خريطة الساحة',
    addLine: 'Add New Line',
    addBlock: 'Add Block to Line',
    deleteLine: 'Delete Line',
    deleteBlock: 'Delete Block',
    lineA: 'LINE A',
    lineB: 'LINE B',
    lineC: 'LINE C',
    lineD: 'LINE D',
    lineE: 'LINE E',
    lineW: 'LINE W',
    lineG: 'LINE G',
    search: 'Search',
    filters: 'Filters',
    quickActions: 'Quick Actions',
    metrics: 'Metric Cards',
    active: 'Active Containers',
    capacity: 'Available Capacity',
    gateInToday: "Today's Gate-In",
    gateOutToday: "Today's Gate-Out",
    totalLines: 'Total Lines',
    meta: 'YMS Control Center',
    blocks: 'Blocks',
    containers: 'Containers',
    downloadTemplate: 'Download Excel Template',
    excelTemplate: 'Line A Excel Template',
    line: 'Line',
    block: 'Block',
    size: 'Size',
    status: 'Status',
    truck: 'Truck Plate',
    driver: 'Driver',
    slot: 'Slot',
    gateInForm: 'Gate-In Registration',
    containerNumber: 'Container Number',
    targetLine: 'Target Line',
    targetBlock: 'Target Block',
    timestamp: 'Timestamp',
    register: 'Register Container',
    gateOutForm: 'Discharge Container',
    outgoingTruck: 'Outgoing Truck Plate',
    outgoingDriver: 'Outgoing Driver',
    destination: 'Destination',
    discharge: 'Discharge Container',
    archiveTitle: 'Historical Ledger',
    archiveSub: 'Containers successfully gated out',
    duration: 'Duration',
    noResults: 'No records match your current filters.',
    success: 'Success',
    warning: 'Warning',
    error: 'Error',
    close: 'Close',
    lineName: 'Line Name',
    blockName: 'Block Name',
    add: 'Add',
    relocate: 'Relocate',
    language: 'Language',
    english: 'English',
    arabic: 'العربية',
    autoAssign: 'Auto-assigned',
    confirmDeleteLine: 'Delete line and all its blocks?',
    confirmDeleteBlock: 'Delete block and its containers?',
    noBlock: 'No block selected',
    duplicateContainer: 'Container number already exists in stock or history.',
    invalidBlock: 'Selected block does not exist.',
    pleaseSelect: 'Please select',
    actionSuccess: 'Operation completed successfully.',
    gateInLogged: 'Container registered and added to stock.',
    gateOutLogged: 'Container discharged and moved to archive.',
    relocateLogged: 'Container relocated successfully.',
    lineDeleted: 'Line removed successfully.',
    blockDeleted: 'Block removed successfully.',
    empty: 'Empty',
    full: 'Full',
    activeStock: 'Active Stock',
    totalCapacity: 'Total Capacity',
    ledger: 'Archive Ledger',
    all: 'All',
    driverFilter: 'Filter by Driver',
    config: 'Operations',
    overview: 'Overview',
    dashboardCard: 'Live yard overview',
    gateInBinTitle: 'Entry log',
    gateOutBinTitle: 'Exit log',
    from: 'From',
    to: 'To',
    notes: 'Notes',
    stockSummary: 'Store summary',
    tableView: 'Detailed stock view',
  },
  ar: {
    company: 'صليهم الهاجري للنقليات',
    companyAr: 'صليهم الهاجري للنقليات',
    dashboard: 'لوحة التحكم',
    gateIn: 'دخول الحاويات',
    gateOut: 'خروج الحاويات',
    stock: 'المخزون النشط',
    archive: 'الأرشيف',
    analytics: 'التقارير',
    yardMap: 'خريطة الساحة',
    yardMapAr: 'خريطة الساحة',
    addLine: 'إضافة خط جديد',
    addBlock: 'إضافة كتلة للخط',
    deleteLine: 'حذف الخط',
    deleteBlock: 'حذف الكتلة',
    lineA: 'الخط A',
    lineB: 'الخط B',
    lineC: 'الخط C',
    lineD: 'الخط D',
    lineE: 'الخط E',
    lineW: 'الخط W',
    lineG: 'الخط G',
    search: 'بحث',
    filters: 'الفلاتر',
    quickActions: 'إجراءات سريعة',
    metrics: 'مقاييس',
    active: 'الحاويات النشطة',
    capacity: 'السعة المتاحة',
    gateInToday: 'دخول اليوم',
    gateOutToday: 'خروج اليوم',
    totalLines: 'إجمالي الخطوط',
    meta: 'مركز تحكم YMS',
    blocks: 'الكتل',
    containers: 'الحاويات',
    downloadTemplate: 'تحميل قالب Excel',
    excelTemplate: 'قالب Line A Excel',
    line: 'الخط',
    block: 'الكتلة',
    size: 'الحجم',
    status: 'الحالة',
    truck: 'لوحة الشاحنة',
    driver: 'السائق',
    slot: 'الموضع',
    gateInForm: 'تسجيل دخول الحاوية',
    containerNumber: 'رقم الحاوية',
    targetLine: 'الخط الهدف',
    targetBlock: 'الكتلة الهدف',
    timestamp: 'التاريخ والوقت',
    register: 'تسجيل الحاوية',
    gateOutForm: 'إخراج الحاوية',
    outgoingTruck: 'لوحة الشاحنة الخارجة',
    outgoingDriver: 'اسم السائق الخارجي',
    destination: 'الوجهة',
    discharge: 'إخراج الحاوية',
    archiveTitle: 'السجل التاريخي',
    archiveSub: 'الحاويات التي خرجت بنجاح',
    duration: 'المدة',
    noResults: 'لا توجد سجلات تطابق الفلاتر الحالية.',
    success: 'نجاح',
    warning: 'تنبيه',
    error: 'خطأ',
    close: 'إغلاق',
    lineName: 'اسم الخط',
    blockName: 'اسم الكتلة',
    add: 'إضافة',
    relocate: 'نقل',
    language: 'اللغة',
    english: 'English',
    arabic: 'العربية',
    autoAssign: 'تخصيص تلقائي',
    confirmDeleteLine: 'هل تريد حذف الخط وبجميع كتلته؟',
    confirmDeleteBlock: 'هل تريد حذف الكتلة وجميع الحاويات بها؟',
    noBlock: 'لم يتم اختيار كتلة',
    duplicateContainer: 'رقم الحاوية موجود بالفعل في المخزون أو الأرشيف.',
    invalidBlock: 'الكتلة المحددة غير موجودة.',
    pleaseSelect: 'يرجى الاختيار',
    actionSuccess: 'تمت العملية بنجاح.',
    gateInLogged: 'تم تسجيل الحاوية وإضافتها للمخزون.',
    gateOutLogged: 'تم إخراج الحاوية ونقلها للأرشيف.',
    relocateLogged: 'تم نقل الحاوية بنجاح.',
    lineDeleted: 'تم حذف الخط بنجاح.',
    blockDeleted: 'تم حذف الكتلة بنجاح.',
    empty: 'فارغة',
    full: 'ممتلئة',
    activeStock: 'المخزون النشط',
    totalCapacity: 'إجمالي السعة',
    ledger: 'سجل الأرشيف',
    all: 'الكل',
    driverFilter: 'تصفية حسب السائق',
    config: 'العمليات',
    overview: 'نظرة عامة',
    dashboardCard: 'ملخص الساحة المباشر',
    gateInBinTitle: 'سجل الدخول',
    gateOutBinTitle: 'سجل الخروج',
    from: 'من',
    to: 'إلى',
    notes: 'ملاحظات',
    stockSummary: 'ملخص المخزون',
    tableView: 'عرض تفصيلي للمخزون',
  },
}

const BLOCK_CAPACITY_LIMIT = 20

const createTimestampInput = () => new Date().toISOString().slice(0, 16)

const baseLinesSource = baseLines.map((line) => ({
  ...line,
  blocks: (line.blocks ?? []).map((block) => ({
    ...block,
    capacity: Number(block.capacity || BLOCK_CAPACITY_LIMIT),
    containers: (block.containers ?? []).map((container) => ({
      ...container,
      id: container.id || `cont-${Date.now()}-${Math.random()}`,
      status: container.status || 'Full',
      truckPlate: container.truckPlate || 'Pending',
      driverName: container.driverName || 'Pending',
    })),
  })),
}))

const yardLines = Array.isArray(baseLinesSource) && baseLinesSource.length > 0 ? baseLinesSource : [
  { id: 'A', name: 'LINE A', blocks: [] },
  { id: 'B', name: 'LINE B', blocks: [] },
  { id: 'C', name: 'LINE C', blocks: [] },
  { id: 'D', name: 'LINE D', blocks: [] },
  { id: 'E', name: 'LINE E', blocks: [] },
  { id: 'W', name: 'LINE W', blocks: [] },
  { id: 'G', name: 'LINE G', blocks: [] },
]

function App() {
  const [language, setLanguage] = useState('en')
  const [activeTab, setActiveTab] = useState('dashboard')
  const [lines, setLines] = useState(yardLines)
  const [archive, setArchive] = useState([])
  const [logs, setLogs] = useState([
    {
      id: 'log-1',
      type: 'Gate-In',
      message: 'MSCU1234565 added to A1',
      timestamp: '2026-09-20T09:15',
    },
    {
      id: 'log-2',
      type: 'Gate-Out',
      message: 'MSCU3344556 discharged from C2',
      timestamp: '2026-09-20T18:00',
    },
  ])
  const [toast, setToast] = useState(null)
  const [modal, setModal] = useState(null)
  const [expandedLines, setExpandedLines] = useState({ A: true })
  const [focusedBlock, setFocusedBlock] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [lineFilter, setLineFilter] = useState('all')
  const [blockFilter, setBlockFilter] = useState('all')
  const [driverFilter, setDriverFilter] = useState('')
  const [gateInForm, setGateInForm] = useState({
    containerNumber: '',
    size: '20ft',
    lineId: 'A',
    blockId: 'A1',
    truckPlate: '',
    driverName: '',
    timestamp: createTimestampInput(),
  })
  const [gateOutForm, setGateOutForm] = useState({
    containerNumber: '',
    truckPlate: '',
    driverName: '',
    destination: '',
    timestamp: createTimestampInput(),
  })
  const [quickAction, setQuickAction] = useState(null)
  const [newLineName, setNewLineName] = useState('')
  const [newBlockName, setNewBlockName] = useState('')
  const [newLineCode, setNewLineCode] = useState('')

  const t = translations[language]
  const isRTL = language === 'ar'

  useEffect(() => {
    if (!toast) return
    const timeout = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(timeout)
  }, [toast])

  const activeContainers = useMemo(
    () =>
      lines.flatMap((line) =>
        line.blocks.flatMap((block) =>
          block.containers.map((container) => ({
            ...container,
            lineId: line.id,
            lineName: line.name,
            blockId: block.id,
            blockName: block.name,
            lineDisplay: line.name,
            blockDisplay: block.name,
          })),
        ),
      ),
    [lines],
  )

  const lineOptions = lines.map((line) => ({ value: line.id, label: line.name }))

  const currentBlockOptions = useMemo(
    () =>
      lines.find((line) => line.id === gateInForm.lineId)?.blocks ?? [],
    [gateInForm.lineId, lines],
  )

  const totalCapacity = useMemo(
    () => lines.reduce((sum, line) => sum + line.blocks.reduce((inner, block) => inner + Number(block.capacity || BLOCK_CAPACITY_LIMIT), 0), 0),
    [lines],
  )

  const availableCapacity = Math.max(totalCapacity - activeContainers.length, 0)

  const todayGateIn = logs.filter((item) => item.type === 'Gate-In' && new Date(item.timestamp).toDateString() === new Date().toDateString()).length
  const todayGateOut = logs.filter((item) => item.type === 'Gate-Out' && new Date(item.timestamp).toDateString() === new Date().toDateString()).length

  const lineStats = lines.map((line) => ({
    id: line.id,
    name: line.name,
    count: activeContainers.filter((container) => container.lineId === line.id).length,
    capacity: line.blocks.reduce((sum, block) => sum + Number(block.capacity || BLOCK_CAPACITY_LIMIT), 0),
  }))

  const filteredContainers = useMemo(() => {
    const query = searchValue.trim().toLowerCase()
    return activeContainers.filter((container) => {
      const matchesQuery =
        !query ||
        container.containerNumber.toLowerCase().includes(query) ||
        container.driverName.toLowerCase().includes(query) ||
        container.lineName.toLowerCase().includes(query) ||
        container.blockName.toLowerCase().includes(query)

      const matchesLine = lineFilter === 'all' || container.lineId === lineFilter
      const matchesBlock = blockFilter === 'all' || container.blockId === blockFilter
      const matchesDriver = !driverFilter || container.driverName.toLowerCase().includes(driverFilter.toLowerCase())
      return matchesQuery && matchesLine && matchesBlock && matchesDriver
    })
  }, [activeContainers, blockFilter, driverFilter, lineFilter, searchValue])

  const showToast = (message, variant = 'success') => {
    setToast({ message, variant })
  }

  const updateLineState = (updater) => {
    setLines((current) => updater(current))
  }

  const findContainerByNumber = (number) =>
    activeContainers.find(
      (container) => container.containerNumber.toUpperCase() === number.trim().toUpperCase(),
    )

  const getNextLineId = (currentLines) => {
    const used = new Set(currentLines.map((line) => line.id))
    let next = 'F'
    while (used.has(next)) {
      next = String.fromCharCode(next.charCodeAt(0) + 1)
    }
    return next
  }

  const getNextBlockId = (line) => `${line.id}${(line.blocks?.length ?? 0) + 1}`

  const removeContainerFromLine = (lineId, blockId, containerId) => {
    setLines((current) =>
      current.map((line) => {
        if (line.id !== lineId) return line
        return {
          ...line,
          blocks: line.blocks.map((block) => {
            if (block.id !== blockId) return block
            return {
              ...block,
              containers: block.containers.filter((container) => container.id !== containerId),
            }
          }),
        }
      }),
    )
  }

  const addNewLine = () => {
    const lineCode = (newLineCode.trim() || getNextLineId(lines)).toUpperCase()
    const lineName = newLineName.trim() || `LINE ${lineCode}`

    if (!lineCode || !lineName) {
      showToast(t.error, 'error')
      return
    }

    if (lines.some((line) => line.id.toUpperCase() === lineCode.toUpperCase())) {
      showToast(`Line ${lineCode} already exists.`, 'error')
      return
    }

    const newLine = {
      id: lineCode,
      name: lineName,
      blocks: [],
    }

    setLines((current) => [...current, newLine])
    setExpandedLines((current) => ({ ...current, [lineCode]: true }))
    setModal(null)
    setNewLineName('')
    setNewLineCode('')
    showToast(t.actionSuccess, 'success')
  }

  const addNewBlock = (lineId) => {
    if (!lineId) return
    updateLineState((current) =>
      current.map((line) => {
        if (line.id !== lineId) return line
        const newBlockId = getNextBlockId(line)
        return {
          ...line,
          blocks: [
            ...line.blocks,
            {
              id: newBlockId,
              name: newBlockName.trim() || newBlockId,
              capacity: BLOCK_CAPACITY_LIMIT,
              containers: [],
            },
          ],
        }
      }),
    )
    setModal(null)
    setNewBlockName('')
    showToast(t.actionSuccess, 'success')
  }

  const deleteLine = (lineId) => {
    setLines((current) => current.filter((line) => line.id !== lineId))
    showToast(t.lineDeleted, 'success')
  }

  const deleteBlock = (lineId, blockId) => {
    updateLineState((current) =>
      current.map((line) => {
        if (line.id !== lineId) return line
        return {
          ...line,
          blocks: line.blocks.filter((block) => block.id !== blockId),
        }
      }),
    )
    showToast(t.blockDeleted, 'success')
  }

  const handleGateInSubmit = (event) => {
    event.preventDefault()
    const normalized = gateInForm.containerNumber.trim()
    const selectedLine = lines.find((line) => line.id === gateInForm.lineId)
    const selectedBlock = selectedLine?.blocks.find((block) => block.id === gateInForm.blockId)

    if (!selectedBlock) {
      showToast(t.invalidBlock, 'error')
      return
    }

    if ((selectedBlock.containers?.length ?? 0) >= BLOCK_CAPACITY_LIMIT) {
      showToast('Block is full (Maximum 20 containers reached)', 'error')
      return
    }

    if (!normalized || !gateInForm.truckPlate.trim() || !gateInForm.driverName.trim()) {
      showToast(t.error, 'error')
      return
    }

    if (
      activeContainers.some(
        (item) => item.containerNumber.toUpperCase() === normalized.toUpperCase(),
      ) ||
      archive.some((item) => item.containerNumber.toUpperCase() === normalized.toUpperCase())
    ) {
      showToast(t.duplicateContainer, 'error')
      return
    }

    const newContainer = {
      id: `cont-${Date.now()}`,
      containerNumber: normalized,
      size: gateInForm.size,
      status: 'Full',
      truckPlate: gateInForm.truckPlate.trim(),
      driverName: gateInForm.driverName.trim(),
      timestamp: gateInForm.timestamp,
      position: `${selectedBlock.name}-${(selectedBlock.containers?.length ?? 0) + 1}`,
    }

    const nextLines = lines.map((line) => {
      if (line.id !== gateInForm.lineId) return line
      return {
        ...line,
        blocks: line.blocks.map((block) => {
          if (block.id !== gateInForm.blockId) return block
          return {
            ...block,
            containers: [...block.containers, newContainer],
          }
        }),
      }
    })

    setLines(nextLines)
    setLogs((current) => [{
      id: `log-${Date.now()}`,
      type: 'Gate-In',
      message: `${normalized} added to ${selectedBlock.name}`,
      timestamp: gateInForm.timestamp,
    }, ...current])
    setExpandedLines((current) => ({ ...current, [gateInForm.lineId]: true }))
    setGateInForm({
      containerNumber: '',
      size: '20ft',
      lineId: gateInForm.lineId,
      blockId: selectedBlock.id,
      truckPlate: '',
      driverName: '',
      timestamp: createTimestampInput(),
    })
    showToast(t.gateInLogged, 'success')
  }

  const handleGateOutSubmit = (event) => {
    event.preventDefault()
    const container = findContainerByNumber(gateOutForm.containerNumber)

    if (!container) {
      showToast('Container not found in active stock.', 'error')
      return
    }

    if (!gateOutForm.truckPlate.trim() || !gateOutForm.driverName.trim() || !gateOutForm.destination.trim()) {
      showToast('Please complete the gate-out details.', 'error')
      return
    }

    const gateInTime = new Date(container.timestamp || gateOutForm.timestamp)
    const gateOutTime = new Date(gateOutForm.timestamp)
    const durationHours = Math.max(1, Math.round((gateOutTime - gateInTime) / (1000 * 60 * 60)))

    const archivedItem = {
      id: `archive-${Date.now()}`,
      containerNumber: container.containerNumber,
      size: container.size,
      status: container.status,
      truckPlate: container.truckPlate,
      driverName: container.driverName,
      lineId: container.lineId,
      lineName: container.lineName,
      blockId: container.blockId,
      blockName: container.blockName,
      gateIn: container.timestamp,
      gateOut: gateOutForm.timestamp,
      outgoingTruckPlate: gateOutForm.truckPlate.trim(),
      outgoingDriverName: gateOutForm.driverName.trim(),
      destination: gateOutForm.destination.trim(),
      durationHours,
    }

    setArchive((current) => [archivedItem, ...current])
    removeContainerFromLine(container.lineId, container.blockId, container.id)
    setLogs((current) => [{
      id: `log-${Date.now()}`,
      type: 'Gate-Out',
      message: `${container.containerNumber} discharged from ${container.blockName}`,
      timestamp: gateOutForm.timestamp,
    }, ...current])
    setGateOutForm({
      containerNumber: '',
      truckPlate: '',
      driverName: '',
      destination: '',
      timestamp: createTimestampInput(),
    })
    setActiveTab('archive')
    showToast(t.gateOutLogged, 'success')
  }

  const relocateContainer = (container, targetLineId, targetBlockId) => {
    if (!targetLineId || !targetBlockId) return

    const targetLine = lines.find((line) => line.id === targetLineId)
    const targetBlock = targetLine?.blocks.find((block) => block.id === targetBlockId)

    if (!targetBlock) {
      showToast(t.invalidBlock, 'error')
      return
    }

    if ((targetBlock.containers?.length ?? 0) >= BLOCK_CAPACITY_LIMIT) {
      showToast('Block is full (Maximum 20 containers reached)', 'error')
      return
    }

    const movedContainer = {
      ...container,
      position: `${targetBlock.name}-${(targetBlock.containers?.length ?? 0) + 1}`,
      lineId: targetLineId,
      lineName: targetLine.name,
      blockId: targetBlockId,
      blockName: targetBlock.name,
    }

    setLines((current) =>
      current.map((line) => {
        if (line.id === container.lineId) {
          return {
            ...line,
            blocks: line.blocks.map((block) => {
              if (block.id !== container.blockId) return block
              return {
                ...block,
                containers: block.containers.filter((item) => item.id !== container.id),
              }
            }),
          }
        }

        if (line.id === targetLineId) {
          return {
            ...line,
            blocks: line.blocks.map((block) => {
              if (block.id !== targetBlockId) return block
              return {
                ...block,
                containers: [...block.containers, movedContainer],
              }
            }),
          }
        }

        return line
      }),
    )

    setQuickAction(null)
    showToast(t.relocateLogged, 'success')
  }

  const blockOptions = useMemo(() => {
    const blocks = []
    lines.forEach((line) => {
      line.blocks.forEach((block) => {
        blocks.push({ value: `${line.id}|${block.id}`, label: `${line.name} / ${block.name}` })
      })
    })
    return blocks
  }, [lines])

  const renderStatusBadge = (status) => {
    const style = status === 'Full' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
    return (
      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}>
        {status === 'Full' ? t.full : t.empty}
      </span>
    )
  }

  const getBlockOccupancy = (block) => ({
    count: block.containers.length,
    total: block.capacity || BLOCK_CAPACITY_LIMIT,
    percentage: Math.min((block.containers.length / (block.capacity || BLOCK_CAPACITY_LIMIT)) * 100, 100),
  })

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-[1600px] p-4 lg:p-6">
        <header className="panel mb-6 overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-slate-200 bg-sky-950 px-4 py-4 text-white md:flex-row md:items-center md:justify-between md:px-6">
            <div className="flex items-center gap-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <img src="/logo.svg" alt="Salihem Al-Hajri logo" className="h-12 w-12 rounded-xl border border-sky-400/60 bg-white object-cover shadow-sm" />
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-xs uppercase tracking-[0.2em] text-sky-200">YMS</p>
                <h1 className="text-lg font-bold md:text-xl">{t.company}</h1>
              </div>
            </div>

            <div className="flex items-center gap-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <div className="flex items-center gap-2 rounded-xl border border-sky-400/60 bg-sky-800/40 px-3 py-2">
                <Globe2 className="h-4 w-4" />
                <span className="text-sm font-medium">{t.language}</span>
                <select
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className="rounded-lg border border-sky-400/50 bg-sky-900/60 px-2 py-1 text-sm text-white outline-none"
                >
                  <option value="en">{t.english}</option>
                  <option value="ar">{t.arabic}</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-semibold text-slate-600">{t.meta}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <span className="rounded-full bg-slate-100 px-2.5 py-1">{t.dashboardCard}</span>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-700">{t.totalLines}: {lines.length}</span>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="panel overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-50 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{t.config}</p>
            </div>
            <nav className="space-y-2 p-3">
              {[
                { id: 'dashboard', label: t.yardMap, icon: LayoutGrid },
                { id: 'gate-in', label: t.gateIn, icon: DoorOpen },
                { id: 'gate-out', label: t.gateOut, icon: DoorClosed },
                { id: 'stock', label: t.stock, icon: Warehouse },
                { id: 'archive', label: t.archive, icon: Archive },
                { id: 'analytics', label: t.analytics, icon: BarChart3 },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${activeTab === id
                    ? 'bg-sky-100 text-sky-900 shadow-sm ring-1 ring-sky-200'
                    : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ))}
            </nav>
          </aside>

          <main className="space-y-6">
            {activeTab === 'dashboard' && (
              <>
                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {[
                    { label: t.active, value: activeContainers.length, color: 'bg-sky-100 text-sky-700', icon: Container },
                    { label: t.capacity, value: availableCapacity, color: 'bg-emerald-100 text-emerald-700', icon: Boxes },
                    { label: t.gateInToday, value: todayGateIn, color: 'bg-violet-100 text-violet-700', icon: DoorOpen },
                    { label: t.gateOutToday, value: todayGateOut, color: 'bg-amber-100 text-amber-700', icon: DoorClosed },
                  ].map(({ label, value, color, icon: Icon }) => (
                    <div key={label} className="panel p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">{label}</p>
                        <span className={`rounded-xl p-2 ${color}`}>
                          <Icon className="h-4 w-4" />
                        </span>
                      </div>
                      <p className="mt-4 text-3xl font-bold text-slate-900">{value}</p>
                    </div>
                  ))}
                </section>

                <section className="panel p-4 md:p-5">
                  <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{t.yardMap}</h2>
                      <p className="text-sm text-slate-500">{t.dashboardCard}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <a href="/yard-template-A.xlsx" download className="btn-secondary">
                        <Archive className="h-4 w-4" />
                        {t.downloadTemplate}
                      </a>
                      <button type="button" className="btn-primary" onClick={() => setModal({ type: 'line' })}>
                        <Plus className="h-4 w-4" />
                        {t.addLine}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {lines.map((line) => (
                      <div key={line.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <div className="flex items-center justify-between gap-3">
                          <button
                            type="button"
                            className="flex flex-1 items-center gap-3 text-left"
                            onClick={() =>
                              setExpandedLines((current) => ({
                                ...current,
                                [line.id]: !current[line.id],
                              }))
                            }
                          >
                            <span className="rounded-xl bg-sky-100 p-2 text-sky-700">
                              <Map className="h-4 w-4" />
                            </span>
                            <div>
                              <p className="font-semibold text-slate-800">{line.name}</p>
                              <p className="text-xs text-slate-500">
                                {line.blocks.length} {t.blocks} · {line.blocks.reduce((sum, block) => sum + block.containers.length, 0)} {t.containers}
                              </p>
                            </div>
                          </button>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="btn-secondary"
                              onClick={() => setModal({ type: 'block', lineId: line.id })}
                            >
                              <Plus className="h-4 w-4" />
                              {t.addBlock}
                            </button>
                            <button
                              type="button"
                              className="btn-danger"
                              onClick={() => {
                                if (window.confirm(t.confirmDeleteLine)) deleteLine(line.id)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              {t.deleteLine}
                            </button>
                          </div>
                        </div>

                        {expandedLines[line.id] && (
                          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                            {line.blocks.length === 0 ? (
                              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
                                {t.addBlock}
                              </div>
                            ) : (
                              line.blocks.map((block) => (
                                <div key={block.id} className="rounded-xl border border-slate-200 bg-white p-3">
                                  <div className="mb-3 flex items-center justify-between gap-2">
                                    <button
                                      type="button"
                                      className="flex flex-1 items-center gap-2 text-left font-semibold text-slate-800"
                                      onClick={() => setFocusedBlock({ lineId: line.id, blockId: block.id })}
                                    >
                                      <Boxes className="h-4 w-4 text-sky-700" />
                                      {block.name}
                                    </button>
                                    <button
                                      type="button"
                                      className="text-red-600 hover:text-red-700"
                                      onClick={() => {
                                        if (window.confirm(t.confirmDeleteBlock)) deleteBlock(line.id, block.id)
                                      }}
                                      aria-label={t.deleteBlock}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>

                                  <div className="mb-3">
                                    <div className="mb-1 flex items-center justify-between text-[11px] font-medium text-slate-600">
                                      <span>{block.containers.length}/{block.capacity || BLOCK_CAPACITY_LIMIT} {t.containers}</span>
                                      <span>{Math.round((block.containers.length / (block.capacity || BLOCK_CAPACITY_LIMIT)) * 100)}%</span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                                      <div
                                        className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-500"
                                        style={{ width: `${Math.min((block.containers.length / (block.capacity || BLOCK_CAPACITY_LIMIT)) * 100, 100)}%` }}
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    {block.containers.length === 0 ? (
                                      <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-2 text-center text-xs text-slate-500">
                                        {t.empty}
                                      </div>
                                    ) : (
                                      block.containers.slice(0, 3).map((container) => (
                                        <div
                                          key={container.id}
                                          className={`rounded-xl border p-2 ${container.size === '40ft' ? 'border-emerald-200 bg-emerald-50' : 'border-sky-200 bg-sky-50'}`}
                                        >
                                          <div className="mb-1 flex items-center justify-between gap-2">
                                            <span className="font-semibold text-slate-800">{container.containerNumber}</span>
                                            <span className="text-[10px] font-bold uppercase text-slate-500">{container.position}</span>
                                          </div>
                                          <div className="mb-2 flex items-center justify-between text-[11px] text-slate-600">
                                            <span>{container.size}</span>
                                            {renderStatusBadge(container.status)}
                                          </div>
                                        </div>
                                      ))
                                    )}
                                    {block.containers.length > 3 && (
                                      <button
                                        type="button"
                                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs font-medium text-slate-600"
                                        onClick={() => setFocusedBlock({ lineId: line.id, blockId: block.id })}
                                      >
                                        View all {block.containers.length} containers
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {activeTab === 'gate-in' && (
              <section className="panel p-4 md:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <span className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
                    <DoorOpen className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{t.gateInForm}</h2>
                    <p className="text-sm text-slate-500">{t.gateInBinTitle}</p>
                  </div>
                </div>

                <form onSubmit={handleGateInSubmit} className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">{t.containerNumber}</span>
                    <input
                      className="field"
                      value={gateInForm.containerNumber}
                      onChange={(event) => setGateInForm({ ...gateInForm, containerNumber: event.target.value })}
                      placeholder="MSCU1234567"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">{t.size}</span>
                    <select
                      className="field"
                      value={gateInForm.size}
                      onChange={(event) => setGateInForm({ ...gateInForm, size: event.target.value })}
                    >
                      <option value="20ft">20ft</option>
                      <option value="40ft">40ft</option>
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">{t.targetLine}</span>
                    <select
                      className="field"
                      value={gateInForm.lineId}
                      onChange={(event) => {
                        const nextLineId = event.target.value
                        const nextLine = lines.find((line) => line.id === nextLineId)
                        setGateInForm({
                          ...gateInForm,
                          lineId: nextLineId,
                          blockId: nextLine?.blocks[0]?.id ?? '',
                        })
                      }}
                    >
                      {lineOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">{t.targetBlock}</span>
                    <select
                      className="field"
                      value={gateInForm.blockId}
                      onChange={(event) => setGateInForm({ ...gateInForm, blockId: event.target.value })}
                    >
                      {currentBlockOptions.length === 0 ? (
                        <option value="">{t.noBlock}</option>
                      ) : (
                        currentBlockOptions.map((block) => (
                          <option key={block.id} value={block.id}>{block.name}</option>
                        ))
                      )}
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">{t.truck}</span>
                    <input
                      className="field"
                      value={gateInForm.truckPlate}
                      onChange={(event) => setGateInForm({ ...gateInForm, truckPlate: event.target.value })}
                      placeholder="B 1234 AB"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">{t.driver}</span>
                    <input
                      className="field"
                      value={gateInForm.driverName}
                      onChange={(event) => setGateInForm({ ...gateInForm, driverName: event.target.value })}
                      placeholder="Abdullah Ali"
                    />
                  </label>

                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm font-medium text-slate-700">{t.timestamp}</span>
                    <input
                      type="datetime-local"
                      className="field"
                      value={gateInForm.timestamp}
                      onChange={(event) => setGateInForm({ ...gateInForm, timestamp: event.target.value })}
                    />
                  </label>

                  <div className="md:col-span-2 flex justify-end">
                    <button type="submit" className="btn-primary">
                      <CheckCircle2 className="h-4 w-4" />
                      {t.register}
                    </button>
                  </div>
                </form>
              </section>
            )}

            {activeTab === 'gate-out' && (
              <section className="panel p-4 md:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <span className="rounded-xl bg-amber-100 p-2 text-amber-700">
                    <DoorClosed className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{t.gateOutForm}</h2>
                    <p className="text-sm text-slate-500">{t.gateOutBinTitle}</p>
                  </div>
                </div>

                <form onSubmit={handleGateOutSubmit} className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm font-medium text-slate-700">{t.containerNumber}</span>
                    <input
                      list="stock-container-list"
                      className="field"
                      value={gateOutForm.containerNumber}
                      onChange={(event) => setGateOutForm({ ...gateOutForm, containerNumber: event.target.value })}
                      placeholder="MSCU1234565"
                    />
                    <datalist id="stock-container-list">
                      {activeContainers.map((container) => (
                        <option key={container.id} value={container.containerNumber} />
                      ))}
                    </datalist>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">{t.outgoingTruck}</span>
                    <input
                      className="field"
                      value={gateOutForm.truckPlate}
                      onChange={(event) => setGateOutForm({ ...gateOutForm, truckPlate: event.target.value })}
                      placeholder="B 8888 FF"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">{t.outgoingDriver}</span>
                    <input
                      className="field"
                      value={gateOutForm.driverName}
                      onChange={(event) => setGateOutForm({ ...gateOutForm, driverName: event.target.value })}
                      placeholder="Salem Ali"
                    />
                  </label>

                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm font-medium text-slate-700">{t.destination}</span>
                    <input
                      className="field"
                      value={gateOutForm.destination}
                      onChange={(event) => setGateOutForm({ ...gateOutForm, destination: event.target.value })}
                      placeholder="Jebel Ali Port"
                    />
                  </label>

                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm font-medium text-slate-700">{t.timestamp}</span>
                    <input
                      type="datetime-local"
                      className="field"
                      value={gateOutForm.timestamp}
                      onChange={(event) => setGateOutForm({ ...gateOutForm, timestamp: event.target.value })}
                    />
                  </label>

                  <div className="md:col-span-2 flex justify-end">
                    <button type="submit" className="btn-primary">
                      <ArrowRightLeft className="h-4 w-4" />
                      {t.discharge}
                    </button>
                  </div>
                </form>
              </section>
            )}

            {activeTab === 'stock' && (
              <section className="panel p-4 md:p-6">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{t.activeStock}</h2>
                    <p className="text-sm text-slate-500">{t.tableView}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        className="field w-52 pl-9"
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        placeholder={t.search}
                      />
                    </div>
                    <select className="field w-36" value={lineFilter} onChange={(event) => setLineFilter(event.target.value)}>
                      <option value="all">{t.line}</option>
                      {lineOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <select className="field w-36" value={blockFilter} onChange={(event) => setBlockFilter(event.target.value)}>
                      <option value="all">{t.block}</option>
                      {blockOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <input
                      className="field w-40"
                      value={driverFilter}
                      onChange={(event) => setDriverFilter(event.target.value)}
                      placeholder={t.driverFilter}
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                      <tr>
                        <th className="px-4 py-3">{t.containerNumber}</th>
                        <th className="px-4 py-3">{t.line}</th>
                        <th className="px-4 py-3">{t.block}</th>
                        <th className="px-4 py-3">{t.slot}</th>
                        <th className="px-4 py-3">{t.size}</th>
                        <th className="px-4 py-3">{t.status}</th>
                        <th className="px-4 py-3">{t.driver}</th>
                        <th className="px-4 py-3">{t.quickActions}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {filteredContainers.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="px-4 py-10 text-center text-slate-500">
                            {t.noResults}
                          </td>
                        </tr>
                      ) : (
                        filteredContainers.map((container) => (
                          <tr key={container.id} className="align-top hover:bg-slate-50">
                            <td className="px-4 py-3 font-semibold text-slate-800">{container.containerNumber}</td>
                            <td className="px-4 py-3">{container.lineName}</td>
                            <td className="px-4 py-3">{container.blockName}</td>
                            <td className="px-4 py-3">{container.position}</td>
                            <td className="px-4 py-3">{container.size}</td>
                            <td className="px-4 py-3">{renderStatusBadge(container.status)}</td>
                            <td className="px-4 py-3">{container.driverName}</td>
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  className="btn-secondary"
                                  onClick={() => {
                                    setGateOutForm((current) => ({ ...current, containerNumber: container.containerNumber }))
                                    setActiveTab('gate-out')
                                  }}
                                >
                                  {t.gateOut}
                                </button>
                                <button
                                  type="button"
                                  className="btn-primary"
                                  onClick={() => setQuickAction({ container, mode: 'relocate' })}
                                >
                                  {t.relocate}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {activeTab === 'archive' && (
              <section className="panel p-4 md:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <span className="rounded-xl bg-slate-100 p-2 text-slate-700">
                    <Archive className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{t.archiveTitle}</h2>
                    <p className="text-sm text-slate-500">{t.archiveSub}</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                      <tr>
                        <th className="px-4 py-3">{t.containerNumber}</th>
                        <th className="px-4 py-3">{t.line}</th>
                        <th className="px-4 py-3">{t.block}</th>
                        <th className="px-4 py-3">{t.driver}</th>
                        <th className="px-4 py-3">{t.truck}</th>
                        <th className="px-4 py-3">{t.duration}</th>
                        <th className="px-4 py-3">{t.destination}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {archive.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-4 py-10 text-center text-slate-500">
                            {t.noResults}
                          </td>
                        </tr>
                      ) : (
                        archive.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-semibold text-slate-800">{item.containerNumber}</td>
                            <td className="px-4 py-3">{item.lineName}</td>
                            <td className="px-4 py-3">{item.blockName}</td>
                            <td className="px-4 py-3">{item.driverName}</td>
                            <td className="px-4 py-3">{item.outgoingTruckPlate}</td>
                            <td className="px-4 py-3">{item.durationHours}h</td>
                            <td className="px-4 py-3">{item.destination}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {activeTab === 'analytics' && (
              <section className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {[
                    { label: t.active, value: activeContainers.length, icon: Boxes },
                    { label: t.totalCapacity, value: totalCapacity, icon: Warehouse },
                    { label: t.gateInToday, value: todayGateIn, icon: DoorOpen },
                    { label: t.gateOutToday, value: todayGateOut, icon: DoorClosed },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="panel p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">{label}</p>
                        <span className="rounded-xl bg-slate-100 p-2 text-slate-600">
                          <Icon className="h-4 w-4" />
                        </span>
                      </div>
                      <p className="mt-4 text-3xl font-bold text-slate-900">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="panel p-4 md:p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="rounded-xl bg-violet-100 p-2 text-violet-700">
                      <BarChart3 className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{t.analytics}</h2>
                      <p className="text-sm text-slate-500">Distribution by line</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {lineStats.map((line) => (
                      <div key={line.id}>
                        <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
                          <span>{line.name}</span>
                          <span>{line.count} / {line.capacity}</span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-sky-600 to-emerald-500"
                            style={{ width: `${Math.min((line.count / Math.max(line.capacity, 1)) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {modal.type === 'line' ? t.addLine : t.addBlock}
              </h3>
              <button type="button" onClick={() => setModal(null)} className="text-slate-500 hover:text-slate-700">
                <X className="h-4 w-4" />
              </button>
            </div>

            {modal.type === 'line' ? (
              <div className="space-y-4">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">{t.lineName}</span>
                  <input className="field" value={newLineName} onChange={(event) => setNewLineName(event.target.value)} placeholder="LINE F" />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Code</span>
                  <input className="field" value={newLineCode} onChange={(event) => setNewLineCode(event.target.value)} placeholder="F" />
                </label>
                <button type="button" className="btn-primary w-full" onClick={addNewLine}>
                  <Plus className="h-4 w-4" />
                  {t.addLine}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">{t.blockName}</span>
                  <input className="field" value={newBlockName} onChange={(event) => setNewBlockName(event.target.value)} placeholder="A5" />
                </label>
                <button type="button" className="btn-primary w-full" onClick={() => addNewBlock(modal.lineId)}>
                  <Plus className="h-4 w-4" />
                  {t.addBlock}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {quickAction && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">{quickAction.mode === 'relocate' ? t.relocate : t.gateOut}</h3>
              <button type="button" onClick={() => setQuickAction(null)} className="text-slate-500 hover:text-slate-700">
                <X className="h-4 w-4" />
              </button>
            </div>

            {quickAction.mode === 'relocate' && (
              <div className="space-y-4">
                <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                  {quickAction.container.containerNumber} · {quickAction.container.lineName} / {quickAction.container.blockName}
                </div>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">{t.targetLine}</span>
                  <select
                    className="field"
                    defaultValue={quickAction.container.lineId}
                    onChange={(event) => {
                      const newLineId = event.target.value
                      const targetLine = lines.find((line) => line.id === newLineId)
                      const targetBlock = targetLine?.blocks[0]?.id ?? ''
                      relocateContainer(quickAction.container, newLineId, targetBlock)
                    }}
                  >
                    {lineOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>
              </div>
            )}
          </div>
        </div>
      )}

      {focusedBlock && (() => {
        const line = lines.find((item) => item.id === focusedBlock.lineId)
        const block = line?.blocks.find((item) => item.id === focusedBlock.blockId)
        if (!line || !block) return null

        const occupancy = getBlockOccupancy(block)
        const occupiedMap = new Map(block.containers.map((container) => [container.position, container]))

        return (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4">
            <div className="w-full max-w-4xl rounded-2xl bg-white p-5 shadow-xl">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{line.name} / {block.name}</h3>
                  <p className="text-sm text-slate-500">{occupancy.count}/{occupancy.total} Containers</p>
                </div>
                <button type="button" onClick={() => setFocusedBlock(null)} className="text-slate-500 hover:text-slate-700">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mb-4">
                <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-600">
                  <span>Occupancy</span>
                  <span>{Math.round(occupancy.percentage)}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-500" style={{ width: `${occupancy.percentage}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 sm:grid-cols-5">
                {Array.from({ length: BLOCK_CAPACITY_LIMIT }, (_, index) => {
                  const slotName = `${block.name}-${String(index + 1).padStart(2, '0')}`
                  const container = occupiedMap.get(slotName)

                  return (
                    <div
                      key={slotName}
                      className={`flex min-h-[86px] flex-col justify-between rounded-xl border p-2 text-center ${container
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 bg-slate-50 text-slate-400'
                        }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wide">{slotName}</span>
                      {container ? (
                        <>
                          <span className="mt-1 text-[10px] font-semibold">{container.containerNumber}</span>
                          <span className="text-[9px]">{container.size}</span>
                        </>
                      ) : (
                        <span className="mt-2 text-[9px]">Free</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
      })()}

      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
          <span className={`rounded-full p-1 ${toast.variant === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
            {toast.variant === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          </span>
          <span className="text-sm font-medium text-slate-700">{toast.message}</span>
        </div>
      )}
    </div>
  )
}

export default App
