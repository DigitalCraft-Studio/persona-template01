# Results Section

We evaluated the performance of this method on multiple benchmark datasets.

## Quantitative Evaluation

The table below shows a comparison of our method with current state-of-the-art methods:

| Method | COCO | Visual Genome | Flickr30k |
|-----|------|--------------|-----------|
| Baseline Model | 75.2% | 68.4% | 82.1% |
| ViLBERT | 82.7% | 74.9% | 85.3% |
| CLIP | 85.1% | 77.2% | 88.7% |
| **Our Method** | **87.6%** | **79.8%** | **91.2%** |

## Ablation Studies

We conducted ablation experiments to evaluate the contributions of different components:

| Component | Accuracy Change |
|-----|---------|
| Cross-Attention | +3.2% |
| Multi-stage Pre-training | +2.7% |
| Contrastive Loss | +1.8% |
| Data Augmentation | +1.5% |

## Inference Time Analysis

We also evaluated the inference efficiency of the model on different hardware:

- GPU (V100): 15ms/sample
- CPU (Intel Xeon): 120ms/sample
- Mobile Device (Snapdragon 888): 250ms/sample

This indicates that while our model can run in real-time on high-end hardware, further optimization is still needed for resource-constrained environments.
