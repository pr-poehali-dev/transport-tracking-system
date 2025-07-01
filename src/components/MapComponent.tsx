import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

interface TrolleyBus {
  id: string;
  route: string;
  position: { x: number; y: number };
  status: "active" | "stopped" | "depot";
  speed: number;
}

const mockTrolleyBuses: TrolleyBus[] = [
  {
    id: "101",
    route: "№1",
    position: { x: 25, y: 30 },
    status: "active",
    speed: 35,
  },
  {
    id: "102",
    route: "№1",
    position: { x: 45, y: 50 },
    status: "active",
    speed: 28,
  },
  {
    id: "201",
    route: "№2",
    position: { x: 65, y: 25 },
    status: "stopped",
    speed: 0,
  },
  {
    id: "301",
    route: "№3",
    position: { x: 30, y: 70 },
    status: "active",
    speed: 42,
  },
  {
    id: "302",
    route: "№3",
    position: { x: 75, y: 60 },
    status: "active",
    speed: 33,
  },
  {
    id: "401",
    route: "№4",
    position: { x: 20, y: 85 },
    status: "depot",
    speed: 0,
  },
];

export default function MapComponent() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "stopped":
        return "bg-red-500";
      case "depot":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "В движении";
      case "stopped":
        return "Остановка";
      case "depot":
        return "В депо";
      default:
        return "Неизвестно";
    }
  };

  return (
    <div className="relative bg-blue-50 h-96 rounded-lg overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50">
        {/* Street Grid */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          {/* Horizontal streets */}
          <line
            x1="0"
            y1="20"
            x2="100"
            y2="20"
            stroke="#ddd"
            strokeWidth="0.5"
          />
          <line
            x1="0"
            y1="40"
            x2="100"
            y2="40"
            stroke="#ddd"
            strokeWidth="0.5"
          />
          <line
            x1="0"
            y1="60"
            x2="100"
            y2="60"
            stroke="#ddd"
            strokeWidth="0.5"
          />
          <line
            x1="0"
            y1="80"
            x2="100"
            y2="80"
            stroke="#ddd"
            strokeWidth="0.5"
          />

          {/* Vertical streets */}
          <line
            x1="20"
            y1="0"
            x2="20"
            y2="100"
            stroke="#ddd"
            strokeWidth="0.5"
          />
          <line
            x1="40"
            y1="0"
            x2="40"
            y2="100"
            stroke="#ddd"
            strokeWidth="0.5"
          />
          <line
            x1="60"
            y1="0"
            x2="60"
            y2="100"
            stroke="#ddd"
            strokeWidth="0.5"
          />
          <line
            x1="80"
            y1="0"
            x2="80"
            y2="100"
            stroke="#ddd"
            strokeWidth="0.5"
          />

          {/* Main routes */}
          <polyline
            points="10,20 50,20 80,40 90,60"
            fill="none"
            stroke="#0EA5E9"
            strokeWidth="1"
            strokeDasharray="2,1"
          />
          <polyline
            points="20,10 20,50 40,70 80,70"
            fill="none"
            stroke="#10B981"
            strokeWidth="1"
            strokeDasharray="2,1"
          />
        </svg>
      </div>

      {/* Trolley Buses */}
      {mockTrolleyBuses.map((bus) => (
        <div
          key={bus.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
          style={{
            left: `${bus.position.x}%`,
            top: `${bus.position.y}%`,
          }}
        >
          {/* Bus Icon */}
          <div
            className={`w-4 h-4 rounded-full ${getStatusColor(bus.status)} border-2 border-white shadow-lg flex items-center justify-center`}
          >
            <span className="text-white text-xs font-bold">
              {bus.id.slice(-1)}
            </span>
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-white p-3 rounded-lg shadow-lg border min-w-max">
              <div className="text-sm font-semibold mb-1">
                Троллейбус {bus.id}
              </div>
              <div className="text-xs text-gray-600 mb-1">
                Маршрут: {bus.route}
              </div>
              <div className="flex items-center justify-between text-xs">
                <Badge variant="outline" className="text-xs">
                  {getStatusText(bus.status)}
                </Badge>
                {bus.speed > 0 && (
                  <span className="text-gray-600 ml-2">{bus.speed} км/ч</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Icon name="ZoomIn" className="h-4 w-4" />
        </button>
        <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Icon name="ZoomOut" className="h-4 w-4" />
        </button>
        <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Icon name="RotateCcw" className="h-4 w-4" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
        <div className="text-xs font-semibold mb-2">Легенда</div>
        <div className="space-y-1">
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>В
            движении
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            Остановка
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>В
            депо
          </div>
        </div>
      </div>
    </div>
  );
}
