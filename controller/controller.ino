#include <Bounce2.h>

int keys[] = {42, 41, 37, 40, 39, 38};
const int numKeys = (sizeof(keys)/sizeof(int));

Bounce bouncer[numKeys];

int highestPin = 12;
int lowestPin = (highestPin - numKeys) + 1;

void setup() {
  for (int i = lowestPin; i <= highestPin; i ++) {
    pinMode(i, INPUT_PULLUP);
    int index = i - lowestPin;
    bouncer[index] = Bounce(i, 5);
  }
  Serial.begin(9600);
  while(!Serial);
}

void loop() {
 for (int i = lowestPin; i <= highestPin; i ++) {
    int index = i - lowestPin;
    bouncer[index].update();
    if (bouncer[index].fell()) {
      Serial.println(keys[index]);
    }
 }
}
