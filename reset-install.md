## List all exited containers

```
docker ps -aq -f status=exited
```

## Remove stopped containers

```
docker ps -aq --no-trunc -f status=exited | xargs docker rm
```

## Remove dangling/untagged images

```
docker images -q --filter dangling=true | xargs docker rmi
```

