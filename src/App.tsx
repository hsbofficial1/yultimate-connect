import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Tournaments from "./pages/Tournaments";
import TournamentDetail from "./pages/TournamentDetail";
import CreateTournament from "./pages/CreateTournament";
import RegisterTeam from "./pages/RegisterTeam";
import TeamsList from "./pages/TeamsList";
import LiveScoring from "./pages/LiveScoring";
import Leaderboard from "./pages/Leaderboard";
import Children from "./pages/Children";
import Sessions from "./pages/Sessions";
import Attendance from "./pages/Attendance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            
            {/* Tournament Routes */}
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/tournaments/create" element={<ProtectedRoute allowedRoles={['tournament_director', 'admin']}><CreateTournament /></ProtectedRoute>} />
            <Route path="/tournaments/:id" element={<TournamentDetail />} />
            <Route path="/tournaments/:id/register-team" element={<ProtectedRoute><RegisterTeam /></ProtectedRoute>} />
            
            {/* Team Routes */}
            <Route path="/teams" element={<ProtectedRoute><TeamsList /></ProtectedRoute>} />
            
            {/* Scoring Routes */}
            <Route path="/scoring/:id" element={<ProtectedRoute allowedRoles={['tournament_director', 'admin', 'volunteer']}><LiveScoring /></ProtectedRoute>} />
            <Route path="/leaderboards/:id?" element={<Leaderboard />} />
            
            {/* Coaching Routes */}
            <Route path="/children" element={<ProtectedRoute allowedRoles={['coach', 'program_manager', 'admin']}><Children /></ProtectedRoute>} />
            <Route path="/sessions" element={<ProtectedRoute allowedRoles={['coach', 'program_manager', 'admin']}><Sessions /></ProtectedRoute>} />
            <Route path="/attendance" element={<ProtectedRoute allowedRoles={['coach', 'program_manager', 'admin']}><Attendance /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
