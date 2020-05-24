

mkdir $HOME/workspace/projects/mongui/backend/commandfiles
docker run --rm -v $HOME/workspace/projects/mongui/backend/commandfiles:/data/db \
  -d -ti --network host --name mongocli mongo /bin/bash