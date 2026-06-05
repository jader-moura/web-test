// Given an array of user objects, write a function that groups them by 'role'.
const users = [
  {
    id: 1,
    name: "John",
    role: "admin",
    email: "john@example.com"
  },
  {
    id: 2,
    name: "Karl",
    role: "user",
    email: "karl@example.com"
  },
  {
    id: 3,
    name: "Sarah",
    role: "admin",
    email: "sarah@example.com"
  },
  {
    id: 4,
    name: "Mike",
    role: "user",
    email: "mike@example.com"
  },
  {
    id: 5,
    name: "Anna",
    role: "manager",
    email: "anna@example.com"
  },
  {
    id: 6,
    name: "Tom",
    role: "manager",
    email: "tom@example.com"
  }
];

function groupByRole(users) {
  return users.reduce((acc, user) => {
    (acc[user.role] ??= []).push(user);
    console.log(acc);
    return acc;

  }, {});
}

groupByRole(users);

// 

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fetchapi.test")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
 
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul> 
  );
}


/// Create a custom hook that toggles a boolean value.
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue((prev) => !prev);
  return [value, toggle];
}

/// Write a simple Express.js route to create a new user.
app.post("/users", async (req, res) => { 
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = new User({ name, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});


/// Write a middleware that logs the method and URL of each incoming request.
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}


/// Design a CloudFront caching strategy to keep global static asset p99 under 200ms while supporting hourly deployments?
To design a CloudFront caching strategy that keeps global static asset p99 under 200ms while supporting hourly deployments, you can follow these steps:

1. **Use Cache-Control Headers**: Set appropriate Cache-Control headers on your static assets to control how long they are cached by CloudFront and browsers. For example, you can set a long max-age for assets that don't change frequently.  
