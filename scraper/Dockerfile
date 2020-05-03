FROM node:13.8.0

RUN apt-get update && apt-get -y install cron

# Add crontab file in the cron directory
ADD crontab /etc/cron.d/hello-cron

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/hello-cron

# Apply cron job
RUN crontab /etc/cron.d/hello-cron

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

WORKDIR /usr/app

COPY . .

RUN npm install

# Run the command on container startup
CMD  printenv | sed 's/^\(.*\)$/export \1/g' > /usr/project_env.sh && npm run prod && echo "yeap" && cron && tail -f /var/log/cron.log