1. unable to access gs values: components not wrapped by context provider in Game.tsx
- wrapped chashierchaos with context provider

2. useEffect timeout not cleaned up
- stored the timeout id in useRef and cleared it in return (better performance)

3. useMemo dependencies wrong for getAmount(multiple): final computed amount also depends on multiple
- useMemo(() => getAmount(multiple), [customer, multiple])
    > when level changes from 1>2>3, difficulty still the same, user still solving old levels difficulty without multiplying the 0.1/0.2 multiples

4. wrong display: money formatting incorrect, displaying $12.5 instead of $12.05, $12.0 instead of $12.00
- game shows 12.5 but it should be 12.05, confusing
- use padStart for cents

5. empty submit: only calculated the a_hundreds and a_cents but didnt handle the value
- added expected and actual values to compare and set results

6. player lives bar empty: initial state missing critical fields
- in Game.tsx, only initState({ cash }), missing customer/remaining lives
- initialize customer and remaining lives explicitly

7. added an overlay for user to choose to whether they want to restart from 0 /current level when timer runs out, to advance to next level after they cleared current level, to choose to go back to instruction page
- create new GameService instance
    > cause level index cannot be reset in node modules
    > by creating new instance reset everything (cash, lives, currLevel)
- restarting using same instance currLevel still the same (for eg if user now at lv 4 and clicks restart they would sitll be at level 4 and not 1)
- for restartlevel, still create new instance
    > and call nextlevel() N times to go to same lvl index
    > only way to move levels currently