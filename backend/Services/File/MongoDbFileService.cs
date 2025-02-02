using MongoDB.Driver;
using MongoDB.Bson;


public class MongoDbFileService
{
    public void TryConnect()
    {
        const string connectionUri = "mongodb+srv://krechuniaka:QjQ1rwtlHoJFyhYO@resume.5z3h4wi.mongodb.net/?retryWrites=true&w=majority&appName=Resume";

        var settings = MongoClientSettings.FromConnectionString(connectionUri);

        // Set the ServerApi field of the settings object to set the version of the Stable API on the client
        settings.ServerApi = new ServerApi(ServerApiVersion.V1);

        // Create a new client and connect to the server
        var client = new MongoClient(settings);

        // Send a ping to confirm a successful connection
        try
        {
            var result = client.GetDatabase("admin").RunCommand<BsonDocument>(new BsonDocument("ping", 1));
            Console.WriteLine("Pinged your deployment. You successfully connected to MongoDB!");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
        }
    }
}

