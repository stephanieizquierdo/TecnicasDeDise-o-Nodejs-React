# Run Dockerfile On Windows:

Ctrl + R --> cmd -->  Then use the following commands:
```
build-docker.bat
run-docker.bat
```


# Run Dockerfile On Linux:

Ctrl+Alt+T --> Go to project's root dir --> Then use the following commands:

```
chmod +x build-docker.sh
chmod +x run-docker.sh
./build-docker.sh
./run-docker.sh
```
# Considerations when running with Docker
When running with dockerfile:

* Frontend will be in the url --> localhost:4000/{routingFront...}

* Backend will be in the url --> localhost:4000/{routingBack...}

# Extra commands:

```
npm test --> To run tests in back's directory
npm start --> To start a development server in front's directory
npm start --> To run server in back's directory
```

# [Informe](https://docs.google.com/document/d/1Tz41V4A601chT_6Qyk9HVjlYaUBtNiLxxKrKirMK9aQ/edit)   