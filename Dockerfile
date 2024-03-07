FROM public.ecr.aws/docker/library/node:18.18

WORKDIR usr/src/smart-brain-api

COPY ./ ./ 

RUN npm install
RUN npm install -g nodemon

CMD ["/bin/bash"]