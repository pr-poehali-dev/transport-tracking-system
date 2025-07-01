import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";

interface Route {
  id: string;
  name: string;
  activeBuses: number;
  totalBuses: number;
  status: "normal" | "delayed" | "disrupted";
  lastUpdate: string;
}

interface TripHistory {
  id: string;
  route: string;
  busId: string;
  startTime: string;
  endTime: string;
  distance: number;
  passengers: number;
}

const mockRoutes: Route[] = [
  {
    id: "1",
    name: "Маршрут №1",
    activeBuses: 4,
    totalBuses: 5,
    status: "normal",
    lastUpdate: "2 мин назад",
  },
  {
    id: "2",
    name: "Маршрут №2",
    activeBuses: 3,
    totalBuses: 4,
    status: "delayed",
    lastUpdate: "1 мин назад",
  },
  {
    id: "3",
    name: "Маршрут №3",
    activeBuses: 5,
    totalBuses: 6,
    status: "normal",
    lastUpdate: "3 мин назад",
  },
  {
    id: "4",
    name: "Маршрут №4",
    activeBuses: 2,
    totalBuses: 3,
    status: "disrupted",
    lastUpdate: "5 мин назад",
  },
  {
    id: "5",
    name: "Маршрут №5",
    activeBuses: 4,
    totalBuses: 4,
    status: "normal",
    lastUpdate: "1 мин назад",
  },
  {
    id: "6",
    name: "Маршрут №6",
    activeBuses: 3,
    totalBuses: 4,
    status: "normal",
    lastUpdate: "4 мин назад",
  },
];

const mockTripHistory: TripHistory[] = [
  {
    id: "1",
    route: "№1",
    busId: "101",
    startTime: "14:30",
    endTime: "15:15",
    distance: 12.5,
    passengers: 45,
  },
  {
    id: "2",
    route: "№2",
    busId: "201",
    startTime: "14:15",
    endTime: "14:55",
    distance: 8.3,
    passengers: 32,
  },
  {
    id: "3",
    route: "№3",
    busId: "301",
    startTime: "14:00",
    endTime: "14:40",
    distance: 15.2,
    passengers: 58,
  },
  {
    id: "4",
    route: "№1",
    busId: "102",
    startTime: "13:45",
    endTime: "14:30",
    distance: 12.5,
    passengers: 41,
  },
  {
    id: "5",
    route: "№4",
    busId: "401",
    startTime: "13:30",
    endTime: "14:10",
    distance: 9.8,
    passengers: 28,
  },
];

export default function RoutePanel() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-600 bg-green-50 border-green-200";
      case "delayed":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "disrupted":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "normal":
        return "Нормально";
      case "delayed":
        return "Задержка";
      case "disrupted":
        return "Нарушение";
      default:
        return "Неизвестно";
    }
  };

  return (
    <div className="space-y-6">
      {/* Routes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon name="Route" className="h-5 w-5 mr-2" />
              Маршруты
            </div>
            <Button size="sm" variant="outline">
              <Icon name="Plus" className="h-4 w-4 mr-1" />
              Добавить
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {mockRoutes.map((route) => (
                <div
                  key={route.id}
                  className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{route.name}</h4>
                    <Badge
                      variant="outline"
                      className={getStatusColor(route.status)}
                    >
                      {getStatusText(route.status)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                      {route.activeBuses}/{route.totalBuses} активных
                    </span>
                    <span className="text-xs">{route.lastUpdate}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Trip History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon name="History" className="h-5 w-5 mr-2" />
              История поездок
            </div>
            <Button size="sm" variant="outline">
              <Icon name="Download" className="h-4 w-4 mr-1" />
              Экспорт
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {mockTripHistory.map((trip) => (
                <div key={trip.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Badge variant="secondary" className="mr-2">
                        {trip.route}
                      </Badge>
                      <span className="text-sm font-medium">
                        Троллейбус {trip.busId}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div>
                      <Icon name="Clock" className="h-3 w-3 inline mr-1" />
                      {trip.startTime} - {trip.endTime}
                    </div>
                    <div>
                      <Icon name="MapPin" className="h-3 w-3 inline mr-1" />
                      {trip.distance} км
                    </div>
                    <div>
                      <Icon name="Users" className="h-3 w-3 inline mr-1" />
                      {trip.passengers} пасс.
                    </div>
                    <div className="text-green-600">
                      <Icon
                        name="CheckCircle"
                        className="h-3 w-3 inline mr-1"
                      />
                      Завершен
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
