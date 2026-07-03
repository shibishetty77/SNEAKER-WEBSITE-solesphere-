const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

// Security headers
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
});

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// General rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// NoSQL injection sanitization
const sanitizeMongo = mongoSanitize();

// XSS protection using DOMPurify
const sanitizeXSS = (req, res, next) => {
  if (req.body) {
    const sanitizeObject = (obj) => {
      if (typeof obj === 'string') {
        return DOMPurify.sanitize(obj);
      }
      if (Array.isArray(obj)) {
        return obj.map(sanitizeObject);
      }
      if (obj !== null && typeof obj === 'object') {
        const sanitized = {};
        for (const key in obj) {
          sanitized[key] = sanitizeObject(obj[key]);
        }
        return sanitized;
      }
      return obj;
    };
    req.body = sanitizeObject(req.body);
  }
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }
  if (req.params) {
    req.params = sanitizeObject(req.params);
  }
  next();
};

// HTTP parameter pollution protection
const protectHPP = hpp();

// Security logging middleware
const securityLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const ip = req.ip || req.connection.remoteAddress;
  const method = req.method;
  const path = req.path;
  
  // Log failed auth attempts
  if ((path.includes('/auth/login') || path.includes('/auth/register')) && res.statusCode >= 400) {
    console.warn(`[SECURITY] ${timestamp} - ${ip} - ${method} ${path} - Status: ${res.statusCode}`);
  }
  
  next();
};

module.exports = {
  securityHeaders,
  authLimiter,
  generalLimiter,
  sanitizeMongo,
  sanitizeXSS,
  protectHPP,
  securityLogger,
};
