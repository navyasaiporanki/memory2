defmodule Memory.Game do
    def new do 
       %{
            jumbledData: jumbleTheData(),
            totalNumberOFClicks: 0,
            currentState: currentStateForDisplay(),
            valuesToBeDisplayed: initialDisplay(),
            matchedTiles: getMatchedTiles(),
            compareValues: false,
            currentCount: 1

        }
    end

    def refresh(game, index) do 
        
             jumbledData_New = jumbleTheData()
             totalNumberOFClicks_New = 0
             currentState_New = currentStateForDisplay()
             valuesToBeDisplayed_New = initialDisplay()
             matchedTiles_New = getMatchedTiles()
             compareValues_New =false
             currentCount_New = 1
 
         
             game = game |> Map.put(:jumbledData, jumbledData_New)
             |> Map.put(:totalNumberOFClicks, totalNumberOFClicks_New)
             |> Map.put(:currentState, currentState_New)
             |> Map.put(:valuesToBeDisplayed, valuesToBeDisplayed_New)
             |> Map.put(:matchedTiles, matchedTiles_New)
             |> Map.put(:compareValues, compareValues_New)
             |> Map.put(:currentCount, currentCount_New)
             
     end


    def client_view(game) do

        %{
            valuesToBeDisplayed: game.valuesToBeDisplayed,
            totalNumberOFClicks: game.totalNumberOFClicks,
            currentState: game.currentState,
            matchedTiles: game.matchedTiles

        }
        
    end

    def jumbleTheData() do
        startList = []
        allCharacters = generateRandomCharacters()
        startList = indicesForCharacters(startList, allCharacters)
        startList
        
    end

   

    defp generateRandomCharacters() do
        ["A","B","C","D","E","F","G","H","A","B","C","D","E","F","G","H"]
    end

    defp indicesForCharacters(startList, randomCharacters) when length(randomCharacters) > 0 do 
        anyRandomCharacter = Enum.random(randomCharacters)
        startList = startList ++ [anyRandomCharacter]
        randomCharacters = randomCharacters -- [anyRandomCharacter]
        
        startList = indicesForCharacters(startList, randomCharacters)

    end

    defp indicesForCharacters(startList, randomCharacters) when  length(randomCharacters) == 0 do 
        startList
    end



    def currentStateForDisplay() do
        []
    end

    def initialDisplay() do
        displayButtons = [" ", " ", " ", " "," ", " ", " ", " "," ", " ", " ", " "," ", " ", " ", " "]
        displayButtons
    end

    def dataFromReact(game, index) do
 
        gs = game.valuesToBeDisplayed
        curr_currentState = game.currentState
        curr_totalNumberOFClicks = game.totalNumberOFClicks
        
 

        curr_currentState = curr_currentState ++ [index]
        curr_totalNumberOFClicks = game.totalNumberOFClicks
        curr_totalNumberOFClicks = curr_totalNumberOFClicks + 1
        #curr_currentCount = curr_currentCount + 1
 
        gameValues = game.jumbledData

        gs = List.replace_at(gs, index, Enum.at(gameValues,index))
 

        curr_currentState_length = length(curr_currentState)

        curr_matchedTiles = game.matchedTiles
        remainder = rem(curr_currentState_length, 2)
        
            #dataFromReact_FirstClick(game, index) 
            game = game |> Map.put(:valuesToBeDisplayed, gs)
            |> Map.put(:currentState, curr_currentState)
            |> Map.put(:totalNumberOFClicks, curr_totalNumberOFClicks)
            |> Map.put(:currentState, curr_currentState)
            |> Map.put(:matchedTiles, curr_matchedTiles)
        #end
    
 

    end

   # def dataFromReact_FirstClick(game, index) do
    #    game = game |> Map.put(:valuesToBeDisplayed, gs)
     #   |> Map.put(:currentState, curr_currentState)
      #  |> Map.put(:totalNumberOFClicks, curr_totalNumberOFClicks)
    #end

    def dataFromReact_SecondClick(game, index) do

        gs = game.valuesToBeDisplayed
        curr_currentState = game.currentState
        curr_totalNumberOFClicks = game.totalNumberOFClicks
       
 
        curr_currentState = curr_currentState ++ [index]
        curr_totalNumberOFClicks = curr_totalNumberOFClicks + 1
   
 
        gameValues = game.jumbledData
        gs = List.replace_at(gs, index, Enum.at(gameValues,index))


        curr_matchedTiles = game.matchedTiles
        

        game = game |> Map.put(:valuesToBeDisplayed, gs)
        |> Map.put(:currentState, curr_currentState)
        |> Map.put(:totalNumberOFClicks, curr_totalNumberOFClicks)
        |> Map.put(:currentState, curr_currentState)
        |> Map.put(:matchedTiles, curr_matchedTiles)
    end


    def compareValues_Clicks(game, index) do

        
        gs = game.valuesToBeDisplayed
        curr_totalNumberOFClicks = game.totalNumberOFClicks
       
 
        curr_currentState = game.currentState
        curr_currentState_length = length(curr_currentState)

        lastVal = curr_currentState_length - 1
        secondLastVal = curr_currentState_length - 2
        #values from current state
        value1 = Enum.at(curr_currentState, lastVal)
        value2 = Enum.at(curr_currentState, secondLastVal)
   

        getValue1 = Enum.at(gs, value1)
        getValue2 = Enum.at(gs, value2)
 
        Process.sleep(1000)
        if getValue1 == getValue2 do

            curr_matchedTiles = game.matchedTiles
            curr_matchedTiles = curr_matchedTiles ++ [getValue1]

            game = game |> Map.put(:valuesToBeDisplayed, gs)
            |> Map.put(:currentState, curr_currentState)
            |> Map.put(:totalNumberOFClicks, curr_totalNumberOFClicks)
            |> Map.put(:currentState, curr_currentState)
            |> Map.put(:matchedTiles, curr_matchedTiles)
        else
            curr_matchedTiles = game.matchedTiles
    
            gs = List.replace_at(gs, value1, " ")
            gs = List.replace_at(gs, value2, " ")

            curr_currentState = List.delete(curr_currentState, lastVal)
            curr_currentState = List.delete(curr_currentState, secondLastVal)
            game = game |> Map.put(:valuesToBeDisplayed, gs)
            |> Map.put(:currentState, curr_currentState)
            |> Map.put(:totalNumberOFClicks, curr_totalNumberOFClicks)
            |> Map.put(:currentState, curr_currentState)
            |> Map.put(:matchedTiles, curr_matchedTiles)
        end




    end


    def getMatchedTiles() do
        []
    end

   
end