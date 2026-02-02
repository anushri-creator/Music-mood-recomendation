async function getMusic() {
  const mood = document.getElementById("mood").value;
  const result = document.getElementById("result");

  if (!mood) {
    result.innerHTML = "⚠️ Please select a mood!";
    return;
  }

  result.innerHTML = "🤖 AI is thinking...";

  try {
    const response = await fetch("/get-music", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood })
    });

    const data = await response.json();

    if (data.error) throw new Error();

    result.innerHTML = "🎶 " + data.choices[0].message.content;

  } catch {
    // Fallback Mode
    if (mood === "happy") result.innerHTML = "🎶 Taylor Swift, Dua Lipa";
    else if (mood === "sad") result.innerHTML = "🎶 Arijit Singh, Adele";
    else if (mood === "relaxed") result.innerHTML = "🎶 Lo-fi Chill Mix";
    else if (mood === "energetic") result.innerHTML = "🎶 EDM Workout Mix";
  }
}
