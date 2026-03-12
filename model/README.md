# 🤖 ML Model Folder

This folder holds the TensorFlow.js model for crop disease classification.

## Structure
```
model/
  model.json       ← Model architecture + weights manifest
  weights.bin      ← Serialized weights (may be split)
```

## Using a Real Model (Recommended)

1. Go to **[Google Teachable Machine](https://teachablemachine.withgoogle.com/)**
2. Choose **Image Project → Standard image model**
3. Create 45 classes (one per crop-disease combination):
   - `strawberry_healthy`, `strawberry_leaf_scorch`, etc.
4. Train with real crop leaf images
5. Export: **TensorFlow.js → Download Model**
6. Extract the zip here — overwrite `model.json` and `weights.bin`

## Current State

The backend ships with a **deterministic mock classifier** that activates when
`model.json` is not found. It uses image byte values to produce realistic-looking
predictions, so the full UI and JSON response pipeline works out of the box.

## PlantVillage Dataset

For training data, use the [PlantVillage dataset](https://www.kaggle.com/datasets/emmarex/plantdisease)
which contains 54,000+ images of 26 crop diseases — perfect for training a Teachable Machine model.

## Class Names (45 total)

```
strawberry_healthy          corn_healthy              apple_healthy
strawberry_leaf_scorch      corn_northern_leaf_blight apple_scab
strawberry_leaf_spot        corn_common_rust          apple_black_rot
strawberry_angular_leaf_spot corn_gray_leaf_spot      apple_cedar_rust
strawberry_powdery_mildew   corn_mosaic_virus         apple_powdery_mildew
bell_pepper_healthy         cherry_healthy            tomato_healthy
bell_pepper_bacterial_spot  cherry_powdery_mildew     tomato_early_blight
bell_pepper_leaf_spot       cherry_leaf_spot          tomato_late_blight
bell_pepper_mosaic_virus    cherry_bacterial_blight   tomato_mosaic_virus
bell_pepper_phytophthora... cherry_brown_rot          tomato_leaf_mold
grape_healthy               peach_healthy             potato_healthy
grape_black_rot             peach_bacterial_spot      potato_early_blight
grape_powdery_mildew        peach_leaf_curl           potato_late_blight
grape_downy_mildew          peach_brown_rot           potato_mosaic_virus
grape_esca                  peach_mosaic_virus        potato_common_scab
```
