---
title: "Common Android scenarios with and without third-party dependencies, part 1: REST Client"
date: "2017-02-27T23:46:37.121Z"
---

In this tutorial series I’ll be creating a very simple app called “GiphyTrends”
that will demonstrate how to use some third-party libraries. The libraries I
chose are the ones that I found extremely useful in previous projects, and the
app itself will be really simple so we can focus in showing the strong points of
them. Our app will display the trending GIFs of “Giphy”. I’m using this service
just because at the moment of writing this tutorial it has an open API that
we’ll be using to retrieve data from. For each tutorial we’ll be comparing one
“Android SDK” solution to a “third-party” one. In other words, we’ll compare
both implementations: with and without the library itself. It doesn’t mean that
these are the only ways to achieve our goals, but rather two different
approaches.

> All example code is hosted in :

> [https://github.com/agustinaliagac/GiphyTrends-AndroidExamples](https://github.com/agustinaliagac/GiphyTrends-AndroidExamples)

#### Building a REST Client in Android

REST ( Representational state transfer) has become a common way of
application-level communication between clients and servers over the network in
the last years. It’s fair to say that this is something that you probably have
done or will do in your next projects. For this tutorial the only API endpoint
we’ll be using is:
[https://github.com/Giphy/GiphyAPI#trending-gifs-endpoint](https://github.com/Giphy/GiphyAPI#trending-gifs-endpoint)
with a simple HTTP GET request. The idea is to retrieve and display all trending
GIFs from this endpoint. So what are some of the options that we have in Android
to create a RESTful Client?

### Implementing without extra libraries

[AsyncTasks](https://developer.android.com/reference/android/os/AsyncTask.html):
This option comes with Android’s core since API Level 3, and it’s available for
us to use without adding any *gradle* dependency. AsyncTask allows us to perform
background operations (e.g. network calls) in a different thread (preventing the
main thread to be blocked) and publish its results on the main thread. This
method is easy to implement, but it comes with some difficulties like the fact
that you have to manage cancellation within our Component’s life-cycle. (read
more:
[http://blog.danlew.net/2014/06/21/the-hidden-pitfalls-of-asynctask/](http://blog.danlew.net/2014/06/21/the-hidden-pitfalls-of-asynctask/)).
We will use AsyncTask to execute the network call through Java’s
**HttpURLConnection** class.

We’ll first create all common components for both approaches (UI, permissions,
entities, etc.). Lets start by adding manifest permissions to our app including
“*INTERNET*” and “*ACCESS_NETWORK_STATE*” permissions to allow us to retrieve
data from the network:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.androidlibsexample">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <activity android:name=".view.MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>

</manifest>
```

#### Setup the Main Activity to display the UI

```java
public class MainActivity extends AppCompatActivity implements FetchGiphyTrendsTask.OnLoadListener {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        FetchGiphyTrendsTask fetchGiphyTrendsTask = new FetchGiphyTrendsTask(this, this);

        fetchGiphyTrendsTask.execute();
    }

    @Override
    public void onLoadComplete(GiphyServiceResponse response) {
        TextView contentText = (TextView) findViewById(R.id.contentText);

        contentText.setText(response.toString());
    }

    @Override
    public void onError() {
        Toast.makeText(this, "There was an error", Toast.LENGTH_SHORT).show();
    }
}
```

#### Create the AsyncTask

Notice that in this approach, we’re directly reading the API response through a
[BufferedReader](http://docs.oracle.com/javase/7/docs/api/java/io/BufferedReader.html?is-external=true).
If you’re not familiar with AsyncTask, the basic concept is that it will execute
the blocking task declared inside the “doInBackground()” method on another
thread, and will later publish its results in “onPostExecute()” method on the UI
thread. This is a cool feature, because it prevents blocking the UI while doing
a blocking operation. Another great feature is that it takes care of
multi-threading communication.

When the task is complete, it will write the raw reponse in a simple TextView,
for the sake of simplicity. In “Part II”, we will take care of our UI so don’t
panic!

```java
public class FetchGiphyTrendsTask extends AsyncTask<Void, Void, GiphyServiceResponse> {

    private final Context mContext;
    private final OnLoadListener mListener;

    public FetchGiphyTrendsTask(Context context, OnLoadListener listener) {
        mContext = context;
        mListener = listener;
    }

    @Override
    protected GiphyServiceResponse doInBackground(Void... params) {
        BufferedReader reader = null;

        try {

            URL myUrl = new URL("http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC");

            HttpURLConnection conn = (HttpURLConnection) myUrl
                    .openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.connect();

            int statusCode = conn.getResponseCode();
            if (statusCode != 200){
                return null;
            }

            InputStream inputStream = conn.getInputStream();
            StringBuffer buffer = new StringBuffer();

            if (inputStream == null) {
                return null;
            }
            reader = new BufferedReader(new InputStreamReader(inputStream));

            String line;
            while ((line = reader.readLine()) != null) {
                buffer.append(line + "\n");
            }

            if (buffer.length() == 0) {
                return null;
            }

            String response = buffer.toString();

            return deserializeServiceResponse(response);

        } catch (IOException e) {

            e.printStackTrace();
            return null;

        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }

    @Override
    protected void onPostExecute(GiphyServiceResponse giphyServiceResponse) {
        super.onPostExecute(giphyServiceResponse);

        if (giphyServiceResponse != null) {
            mListener.onLoadComplete(giphyServiceResponse);
        }
    }

    private GiphyServiceResponse deserializeServiceResponse(String response){

        GiphyServiceResponse giphyServiceResponse = null;

        try {
            JSONObject responseJson = new JSONObject(response);
            JSONArray dataJson = responseJson.getJSONArray("data");

            ArrayList<Gif> gifs = new ArrayList<Gif>();

            for (int i = 0; i < dataJson.length(); i++) {

                JSONObject gifJson = dataJson.getJSONObject(i);
                JSONObject imagesJson = gifJson.getJSONObject("images");
                JSONObject fixedHeightImageJson = imagesJson.getJSONObject("fixed_height");
                JSONObject fixedWidthImageJson = imagesJson.getJSONObject("fixed_width");
                JSONObject downsizedImageJson = imagesJson.getJSONObject("downsized");

                Image fixedHeight = new Image(fixedHeightImageJson.getString("url"),
                        fixedWidthImageJson.getInt("width"),
                        fixedHeightImageJson.getInt("height"));

                Image fixedWidth = new Image(fixedWidthImageJson.getString("url"),
                        fixedWidthImageJson.getInt("width"),
                        fixedHeightImageJson.getInt("height"));

                Image downsized = new Image(downsizedImageJson.getString("url"),
                        fixedWidthImageJson.getInt("width"),
                        fixedHeightImageJson.getInt("height"));

                Images images = new Images(fixedHeight, fixedWidth, downsized);

                Gif gif = new Gif(gifJson.getString("id"),
                        gifJson.getString("slug"),
                        gifJson.getString("username"),
                        images);

                gifs.add(gif);
            }

            giphyServiceResponse = new GiphyServiceResponse(gifs);
        } catch (JSONException e){
            e.printStackTrace();

            mListener.onError();
        }

        return giphyServiceResponse;
    }

    public interface OnLoadListener {

        void onLoadComplete(GiphyServiceResponse response);

        void onError();

    }
}
```

#### **What about serialization?**

The server response comes serialized in JSON format (Javascript Object
Notation), but we are only able to see a String representation after reading it
with *BufferedReader*. We need a way to map this JSON response into Java
objects, to be able to manipulate the data and do whatever we want with it. This
process is called “*deserialization*”.

In this approach, we have to take care of this process, as you can see in
“*deserializeServiceResponse()*” method. We’re using “*org.json*” package
classes to get JSONObjects and JSONArrays , and later transforming this data
into our entity objects. The process is defined within a *try-catch* structure
to avoid crashes from *JSONException* in runtime.

Now lets imagine that “*Giphy*” decides to change this API endpoint, so the JSON
response will be structured differently. Using this approach, it would imply
that we have to change our entity’s attributes as well as our deserialization
method. This may not sound as a big deal, but if the API is constantly evolving
(e.g during parallel backend and mobile development) it can be a really tedious
task to do.

### Using Retrofit and Gson

[Retrofit](https://square.github.io/retrofit/) is an open source library created
by Square, that defines itself as it follows:

> “A type-safe HTTP client for Android and Java”.

It aims simplicity, performing synchronous or asynchronous HTTP requests, which
means you can make either “blocking” or “non-blocking” calls. If you want to use
blocking calls, remember to implement it in a separate thread to avoid blocking
the app’s main thread, otherwise you’ll get a NetworkOnMainThreadException. I
haven’t done a performance/profiling test on the library, but I never had any
kind of problems with that aspect. Let’s see how we can implement the same
“AsyncTask” behavior but using this library.

#### **Adding the dependency in the app’s “build.gradle” file**

     compile ‘com.squareup.retrofit2:retrofit:2.2.0’
     compile ‘com.squareup.retrofit2:converter-gson:2.2.0’

#### **Defining the API endpoints**

You’ll need to create a Java interface to declare each endpoint that you’ll be
using of the API. Using annotations you can specify which HTTP method to use, as
well as the root-relative path. In this case, we’re only setting up one simple
endpoint.

    public interface GiphyAPI {

    @GET(“gifs/trending”)
      Call<GiphyServiceResponse> getTrends(@Query(“api_key”) String apiKey);
    }

The “*getTrends*()” method will return a Call object, that will later be used to
access the endpoint. Notice we’re setting the class type using Generics so the
library knows what kind of objects will manipulate. Retrofit allows us to pass
this method a @Query parameter, or a @Path variable to fully build the URL
you’re targeting. Also, if you’re performing a POST/PUT request, you can pass a
@Body variable to tell the library how to build the request.

#### Building and executing the request

Finally, we have to build an execute the request. We’re using an asynchronous
call, getting the result in the callback method, and displaying it in a simple
TextView, just like in the first approach.

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        Gson gson = new GsonBuilder()
                .create();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://api.giphy.com/v1/")
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();

        GiphyAPI service = retrofit.create(GiphyAPI.class);

        Call<GiphyServiceResponse> call = service.getTrends("dc6zaTOxFJmzC");

        call.enqueue(new Callback<GiphyServiceResponse>() {
            @Override
            public void onResponse(Call<GiphyServiceResponse> call, Response<GiphyServiceResponse> response) {

                TextView contentText = (TextView) findViewById(R.id.contentText);
                contentText.setText(response.body().toString());
            }

            @Override
            public void onFailure(Call<GiphyServiceResponse> call, Throwable t) {

            }
        });
    }
}
```

#### **Serializers with Retrofit**

Retrofit uses “Converters” to serialize/deserialize objects. In our case, we’re
using “[Gson](https://github.com/google/gson)” as a serialization library, but
you could also pick another one like
[Jackson](https://github.com/FasterXML/jackson) or
[Moshi](https://github.com/square/moshi).

In contrast to the tedious process of using “*org.json*” classes to deserialize
the response, you can directly use your entity classes to tell Retrofit how the
response is structured, and how it should be (de)serialized. The only thing you
need to take care of, is specifying the class attributes’s names when they are
different from the JSON response using the @SerializedName annotation.

```java
import com.google.gson.annotations.SerializedName;

/**
 * Created by agustinaliaga on 2/23/17.
 */

public class Images {

    @SerializedName("fixed_height")
    private Image fixedHeight;

    @SerializedName("fixed_width")
    private Image fixedWidth;

    private Image downsized;

    public Images(Image fixedHeight, Image fixedWidth, Image downsized) {
        this.fixedHeight = fixedHeight;
        this.fixedWidth = fixedWidth;
        this.downsized = downsized;
    }

    public Image getFixedHeight() {
        return fixedHeight;
    }

    public void setFixedHeight(Image fixedHeight) {
        this.fixedHeight = fixedHeight;
    }

    public Image getFixedWidth() {
        return fixedWidth;
    }

    public void setFixedWidth(Image fixedWidth) {
        this.fixedWidth = fixedWidth;
    }

    public Image getDownsized() {
        return downsized;
    }

    public void setDownsized(Image downsized) {
        this.downsized = downsized;
    }

    @Override
    public String toString() {

        StringBuilder builder = new StringBuilder();
        builder.append(fixedHeight.toString());
        builder.append(fixedWidth.toString());
        builder.append(downsized.toString());

        return builder.toString();
    }
}
```

### **Conclusion**

With Retrofit, programming gets much more “declarative” and less “imperative”
allowing you to focus on the data and what to do with it. I gained a lot of
productivity just by adopting Retrofit as my default REST Client interface. Some
of the greatest things about it are:

* Retrofit gives you full control of asynchronous/synchronous requests, without
the need of cancelling tasks during life-cycle updates of your components.
* You can easily add “interceptors” to perform tasks like adding HTTP headers or
data to your request, or analyze responses globally.
* (De)serializing objects is quite faster to implement using a *Converter* with
*Gson *compared to using “org.json” classes, and performance looks great. If you
need a very specific way to serialize an object, *Gson* still handles this
situation allowing you the register your own
[TypeAdapter](https://google.github.io/gson/apidocs/com/google/gson/TypeAdapter.html)
.
* The code looks way cleaner, just because you can define all endpoints (if you
want to) in a single Java Interface, but still manage each one of them
separately with the help of annotations and the tools Retrofit gives you.

Hopefully, this tutorial helped you to know how Retrofit works, and how simple
it is to build a full REST Client with it. In “Part II”, we’ll build our UI for
this app exploring “Android-core” options as well as libraries like “Butter
knife”, and “Data-binding library”.

Remember you can clone/fork the project here:
[https://github.com/agustinaliagac/GiphyTrends-AndroidExamples](https://github.com/agustinaliagac/GiphyTrends-AndroidExamples)
