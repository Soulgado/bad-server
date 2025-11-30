import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 1000,
    limit: 40,
    standardHeaders: true,
    legacyHeaders: false,
})

export default limiter