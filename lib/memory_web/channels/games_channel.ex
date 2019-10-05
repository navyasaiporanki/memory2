defmodule MemoryWeb.GamesChannel do
  use MemoryWeb, :channel

  alias Memory.Game
  alias Memory.BackupAgent

  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
      game = BackupAgent.get(name) || Game.new()
      socket = socket
      |> assign(:game, game)
      |> assign(:name, name)

      BackupAgent.put(name, game)
      {:ok, %{"join" => name, "game" => Game.client_view(game)}, socket}
   else
       {:error, %{reason: "UnAuthorized"}}
   end
  end


  def handle_in("refresh", %{"index" => "hello"}, socket) do 
    name = socket.assigns[:name]
    game = Game.refresh(socket.assigns[:game], "hello")                                                                                                                                                            
    socket = assign(socket, :game, game)
    BackupAgent.put(name, game)                                                                                                                                                                          
    {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("dataFromReact", %{"index" => value}, socket) do 
    name = socket.assigns[:name]
    game = Game.dataFromReact(socket.assigns[:game], value)                                                                                                                                                            
    socket = assign(socket, :game, game)
    BackupAgent.put(name, game)                                                                                                                                                                          
    {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end

  def handle_in("dataFromReact_SecondClick", %{"index" => value}, socket) do 
    name = socket.assigns[:name] 
    game = Game.dataFromReact_SecondClick(socket.assigns[:game], value)                                                                                                                                                            
    socket = assign(socket, :game, game)
    BackupAgent.put(name, game)                                                                                                                                                                          
    {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end

  def handle_in("compareValues_Clicks", %{"index" => value}, socket) do 
    name = socket.assigns[:name] 
    game = Game.compareValues_Clicks(socket.assigns[:game], value)                                                                                                                                                            
    socket = assign(socket, :game, game)
    BackupAgent.put(name, game)                                                                                                                                                                          
    {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (games:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:reply,{:ok, "shouting"}, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end


end
