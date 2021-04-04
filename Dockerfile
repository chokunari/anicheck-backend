FROM node:current-buster
RUN mkdir /home/app
ADD ./ /home/app/
WORKDIR /home/app
RUN npm install

CMD ["/bin/bash"]
