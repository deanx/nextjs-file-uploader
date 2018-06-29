### nextjs-file-uploader

* Execute
npm run start:dev

### Play around
- open http://localhost:3000
- Choose a file and click on the upload button
- After success message, click on save button to see your file

### Assumptions
- We must have a frontend to validate this service
- We need to avoid the same file being uploaded several times (store the file with it's hash as it's name)
- In order to have better performance, we must use streams all the time we're dealing with files, specially if we can have heavy ones

### Production mode
- Replace the in memory database for something like Redis (key/pair)
- Replace the implementation of fileSavePerm function. We should send this file to some cloud storage

### Decisions
- Design a system in such direction that we can move to prod without big changes in the structure
- Use a database to store hash/location, since would be mandatory have this file stored outside local storage
- Tried to use self-signed tokens (JWT) for this scenario, but the token as too big for a file name
- Don't return an error if the file already exists. Only return all the time the same hash for the same file.

### Decisions driven for the 100.000 case
- Make possible to decouple file location. Use an alternative to isolate it. In this case, a local database.
- Deal with all files as streams
- Have a limitation mechanism (current 5) do don't allow too many uploads at sime time (guarantee service running). For production, this number should be found due to hardware capacity

### Possible enhancements if we have a high load, or really big files
- Send the response for upload after having the tmp name only and process the hash and upload to the cloud in another process. Maybe use a language like Golang for this purpose.
- Stop process if the hash is already in the database
