1. unable to access gs values: components not wrapped by context provider in Game.tsx
- wrapped chashierchaos with context provider

2. useEffect timeout not cleaned up
- stored the timeout id in useRef and cleared it in return

3. useMemo dependencies wrong for getAmount(multiple): final computed amount also depends on multiple 
- useMemo(() => getAmount(multiple), [customer, multiple])

4. money formatting was incorrect: displaying $12.5 instead of $12.05, $12.0 instead of $12.00.
- use padStart for cents

5. empty submit: only calculated the a_hundreds and a_cents but didnt handle the value
- added expected and actual values
- set results

6. Initial state missing critical fields: In Game.tsx, only initState({ cash }), missing customer/remaining lives
- initialize customer and remaining lives explicitly:

7. GameComponent in App.tsx not wrapped in ComponentRefresh as stated in the GAMEZ_GUIDE: game not refreshing when advancing to next level
- wrapped GameComponent in ComponentRefresh

8. added an overlay for user to restart from 0 when timer runs out (still in progress)