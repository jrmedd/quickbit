#include <Adafruit_NeoPixel.h>

#include <Bounce2.h>

int keys[] = {42, 41, 37, 40, 39, 38};
const int numKeys = (sizeof(keys)/sizeof(int));

Bounce bouncer[numKeys];

const int pixelPin = 2;
const int pixelCount = 2;

Adafruit_NeoPixel pixels = Adafruit_NeoPixel(pixelCount, pixelPin, NEO_GRB + NEO_KHZ800);

int highestPin = 12;
int lowestPin = (highestPin - numKeys) + 1;

void setup() {
  for (int i = lowestPin; i <= highestPin; i ++) {
    pinMode(i, INPUT_PULLUP);
    int index = i - lowestPin;
    bouncer[index] = Bounce(i, 5);
  }
  Serial.begin(9600);
  pixels.begin(); 
  while(!Serial);
  Serial.println("Connected");
}

void loop() {
 for (int i = lowestPin; i <= highestPin; i ++) {
  int index = i - lowestPin;
  bouncer[index].update();
  if (bouncer[index].fell()) {
    Serial.println(keys[index]);
  }
 }
 if (Serial.available() > 0 ) {
  int mode = Serial.parseInt();
  if (Serial.read() == '\n') {
    colourMode(mode);
  }
 }
}

uint32_t colors[] = {pixels.Color(0,0,0), pixels.Color(0,255,0), pixels.Color(255,0,0),pixels.Color(255,255,255)};

void colourMode(int selectedMode) {
  for (int i = 0; i < pixelCount; i ++) {
    pixels.setPixelColor(i, colors[selectedMode]);
  }
  pixels.show();
}

