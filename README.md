
# GDSC Admin Panel

Our platform offers a comprehensive suite of features tailored to streamline management tasks and enhance communication within the Google Developer Student Club (GDSC) at Netaji Subhas University of Technology (NSUT). From blog creation and event coordination to resource sharing and project collaboration, our intuitive web interface empowers administrators to efficiently oversee society affairs, drive growth, and foster innovation within the GDSC developer community. Join us in shaping the future of technology education and innovation at NSUT with the GDSC NSUT Admin Panel!


## API Reference

#### Get all blogs

```http
  GET /api/get-all-blogs
```

| Parameter - No Parameters required |


#### Get a blog

```http
  GET /api/get-blog?id=${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of blog to fetch |



## Contributing

Contributions are always welcome!

To clone the project copy the Project's url and clone it into your local environment.

Ask the admin for db credentials and paste them into .env.example

To run the project locally run ```npm run dev```



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

Duplicate the .env.example file to .env.local and then request the admin for the following environment variables.

`NEXT_PUBLIC_SUPABASE_URL`

`NEXT_PUBLIC_SUPABASE_ANON_KEY`

`SUPERADMIN_EMAIL`


## Authors

- [@ayshthkr](https://www.github.com/ayshthkr)
- [@PrakashSinghRawat-git](https://www.github.com/PrakashSinghRawat-git)

