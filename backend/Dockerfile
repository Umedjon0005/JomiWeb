FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Fetch SSL root certificate for managed PostgreSQL
RUN apk add --no-cache curl \
  && mkdir -p /app/certs \
  && curl -o /app/certs/root.crt "https://st.timeweb.com/cloud-static/ca.crt" \
  && chmod 0600 /app/certs/root.crt

COPY . .

# Ensure uploads directory exists
RUN mkdir -p uploads

ENV PGSSLROOTCERT=/app/certs/root.crt \
    NODE_ENV=production \
    PORT=5000

EXPOSE 5000

CMD ["npm", "start"]

