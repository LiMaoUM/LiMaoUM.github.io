---
layout: post
title: a post with advanced image components
date: 2024-01-27 11:46:00
description: this is what advanced image components could look like
tags: formatting images
categories: sample-posts
thumbnail: assets/img/9.jpg
images:
  compare: true
  slider: true
---

This is an example post with advanced image components.

## Image Slider

This is a simple image slider. It uses the [Swiper](https://swiperjs.com/) library. Check the [examples page](https://swiperjs.com/demos) for more information of what you can achieve with it.

<swiper-container keyboard="true" navigation="true" pagination="true" pagination-clickable="true" pagination-dynamic-bullets="true" rewind="true">
  <swiper-slide><img src="{{ '/assets/img/9.jpg' | relative_url }}" alt="Image 9" class="img-fluid rounded z-depth-1" loading="eager" /></swiper-slide>
  <swiper-slide><img src="{{ '/assets/img/7.jpg' | relative_url }}" alt="Image 7" class="img-fluid rounded z-depth-1" loading="eager" /></swiper-slide>
  <swiper-slide><img src="{{ '/assets/img/8.jpg' | relative_url }}" alt="Image 8" class="img-fluid rounded z-depth-1" loading="eager" /></swiper-slide>
  <swiper-slide><img src="{{ '/assets/img/10.jpg' | relative_url }}" alt="Image 10" class="img-fluid rounded z-depth-1" loading="eager" /></swiper-slide>
  <swiper-slide><img src="{{ '/assets/img/12.jpg' | relative_url }}" alt="Image 12" class="img-fluid rounded z-depth-1" loading="eager" /></swiper-slide>
</swiper-container>

## Image Comparison Slider

This is a simple image comparison slider. It uses the [img-comparison-slider](https://img-comparison-slider.sneas.io/) library. Check the [examples page](https://img-comparison-slider.sneas.io/examples.html) for more information of what you can achieve with it.

<img-comparison-slider>
  <img src="{{ '/assets/img/prof_pic.jpg' | relative_url }}" alt="Profile Picture" class="img-fluid rounded z-depth-1" slot="first" loading="eager" />
  <img src="{{ '/assets/img/prof_pic_color.png' | relative_url }}" alt="Colored Profile Picture" class="img-fluid rounded z-depth-1" slot="second" loading="eager" />
</img-comparison-slider>
