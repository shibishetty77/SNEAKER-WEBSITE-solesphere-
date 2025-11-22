import React, { createContext, useContext, useState, useEffect } from 'react';

const UserTrackingContext = createContext();

export const useUserTracking = () => {
  const context = useContext(UserTrackingContext);
  if (!context) {
    throw new Error('useUserTracking must be used within a UserTrackingProvider');
  }
  return context;
};

export const UserTrackingProvider = ({ children }) => {
  const [userSessions, setUserSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [realtimeStats, setRealtimeStats] = useState({
    activeUsers: 0,
    pageViews: 0,
    cartAdditions: 0,
    conversions: 0
  });

  // Generate unique session ID
  const generateSessionId = () => {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  // Get user's location (simplified)
  const getUserLocation = () => {
    // In a real app, you'd use geolocation API or IP-based location
    const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Pune'];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  // Get device type
  const getDeviceType = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('mobile')) return 'Mobile';
    if (userAgent.includes('tablet')) return 'Tablet';
    return 'Desktop';
  };

  // Start user session
  const startSession = (user = null) => {
    const sessionId = generateSessionId();
    const newSession = {
      id: sessionId,
      userId: user?.id || null,
      userName: user?.name || 'Anonymous User',
      userEmail: user?.email || null,
      location: getUserLocation(),
      device: getDeviceType(),
      startTime: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      currentPage: window.location.pathname,
      pageViews: 1,
      cartAdditions: 0,
      isActive: true,
      sessionDuration: 0
    };

    setCurrentSession(newSession);
    setUserSessions(prev => [...prev.filter(s => s.id !== sessionId), newSession]);
    
    // Store in localStorage for persistence
    localStorage.setItem('userSession', JSON.stringify(newSession));
    
    return sessionId;
  };

  // Update current page
  const updateCurrentPage = (page) => {
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        currentPage: page,
        lastActivity: new Date().toISOString(),
        pageViews: currentSession.pageViews + 1
      };
      
      setCurrentSession(updatedSession);
      setUserSessions(prev => 
        prev.map(s => s.id === currentSession.id ? updatedSession : s)
      );
      
      localStorage.setItem('userSession', JSON.stringify(updatedSession));
    }
  };

  // Track cart addition
  const trackCartAddition = () => {
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        cartAdditions: currentSession.cartAdditions + 1,
        lastActivity: new Date().toISOString()
      };
      
      setCurrentSession(updatedSession);
      setUserSessions(prev => 
        prev.map(s => s.id === currentSession.id ? updatedSession : s)
      );
      
      localStorage.setItem('userSession', JSON.stringify(updatedSession));
    }
  };

  // Track conversion (purchase)
  const trackConversion = () => {
    setRealtimeStats(prev => ({
      ...prev,
      conversions: prev.conversions + 1
    }));
  };

  // Update session activity
  const updateActivity = () => {
    if (currentSession) {
      const now = new Date();
      const startTime = new Date(currentSession.startTime);
      const sessionDuration = Math.floor((now - startTime) / 1000 / 60); // in minutes

      const updatedSession = {
        ...currentSession,
        lastActivity: now.toISOString(),
        sessionDuration,
        isActive: true
      };
      
      setCurrentSession(updatedSession);
      setUserSessions(prev => 
        prev.map(s => s.id === currentSession.id ? updatedSession : s)
      );
      
      localStorage.setItem('userSession', JSON.stringify(updatedSession));
    }
  };

  // End session
  const endSession = () => {
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        isActive: false,
        endTime: new Date().toISOString()
      };
      
      setUserSessions(prev => 
        prev.map(s => s.id === currentSession.id ? updatedSession : s)
      );
      
      setCurrentSession(null);
      localStorage.removeItem('userSession');
    }
  };

  // Get active sessions (for admin dashboard)
  const getActiveSessions = () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return userSessions.filter(session => {
      const lastActivity = new Date(session.lastActivity);
      return session.isActive && lastActivity > fiveMinutesAgo;
    });
  };

  // Initialize session on mount
  useEffect(() => {
    // Check if there's an existing session
    const savedSession = localStorage.getItem('userSession');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        const lastActivity = new Date(session.lastActivity);
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        
        if (lastActivity > fiveMinutesAgo) {
          // Resume existing session
          setCurrentSession(session);
          setUserSessions(prev => [...prev.filter(s => s.id !== session.id), session]);
        } else {
          // Start new session
          startSession();
        }
      } catch (error) {
        startSession();
      }
    } else {
      startSession();
    }

    // Update activity every 30 seconds
    const activityInterval = setInterval(updateActivity, 30000);

    // Clean up inactive sessions every minute
    const cleanupInterval = setInterval(() => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      setUserSessions(prev => 
        prev.filter(session => {
          const lastActivity = new Date(session.lastActivity);
          return lastActivity > fiveMinutesAgo;
        })
      );
    }, 60000);

    // Handle page visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched tabs or minimized
        if (currentSession) {
          const updatedSession = { ...currentSession, isActive: false };
          setCurrentSession(updatedSession);
        }
      } else {
        // User returned
        updateActivity();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Handle beforeunload
    const handleBeforeUnload = () => {
      endSession();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(activityInterval);
      clearInterval(cleanupInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Update realtime stats based on actual sessions
  useEffect(() => {
    const activeSessions = getActiveSessions();
    const totalPageViews = activeSessions.reduce((sum, session) => sum + session.pageViews, 0);
    const totalCartAdditions = activeSessions.reduce((sum, session) => sum + session.cartAdditions, 0);

    setRealtimeStats(prev => ({
      ...prev,
      activeUsers: activeSessions.length,
      pageViews: totalPageViews,
      cartAdditions: totalCartAdditions
    }));
  }, [userSessions]);

  const value = {
    userSessions,
    currentSession,
    realtimeStats,
    startSession,
    updateCurrentPage,
    trackCartAddition,
    trackConversion,
    updateActivity,
    endSession,
    getActiveSessions
  };

  return (
    <UserTrackingContext.Provider value={value}>
      {children}
    </UserTrackingContext.Provider>
  );
};
