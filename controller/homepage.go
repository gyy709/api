package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"one-api/common/config"
	"one-api/model"
)

// AnnouncementOption 公告配置结构
type AnnouncementOption struct {
	ID        string `json:"id"`
	Title     string `json:"title"`
	Content   string `json:"content"`
	Enabled   bool   `json:"enabled"`
	CreatedAt int64  `json:"created_at"`
	UpdatedAt int64  `json:"updated_at"`
}

// HomePageConfigOption 首页配置结构
type HomePageConfigOption struct {
	Mode     string        `json:"mode"`
	Hero     HeroConfig    `json:"hero"`
	Features []FeatureItem `json:"features"`
	Services []ServiceItem `json:"services"`
}

type HeroConfig struct {
	Title           string `json:"title"`
	Subtitle        string `json:"subtitle"`
	CtaText         string `json:"cta_text"`
	CtaLink         string `json:"cta_link"`
	BackgroundImage string `json:"background_image,omitempty"`
}

type FeatureItem struct {
	ID          string `json:"id"`
	Icon        string `json:"icon"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

type ServiceItem struct {
	ID          string `json:"id"`
	Icon        string `json:"icon"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Link        string `json:"link,omitempty"`
}

// GetAnnouncement 获取公告
func GetAnnouncement(c *gin.Context) {
	config.OptionMapRWMutex.RLock()
	defer config.OptionMapRWMutex.RUnlock()

	announcementJSON := config.OptionMap["Announcement"]

	var announcement AnnouncementOption
	if announcementJSON != "" {
		err := json.Unmarshal([]byte(announcementJSON), &announcement)
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"success": false,
				"message": "解析公告配置失败",
				"data":    nil,
			})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "",
		"data":    announcement,
	})
}

// UpdateAnnouncement 更新公告（管理员）
func UpdateAnnouncement(c *gin.Context) {
	var announcement AnnouncementOption
	err := c.ShouldBindJSON(&announcement)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": "无效的请求参数",
		})
		return
	}

	// 验证
	if announcement.Title == "" {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": "公告标题不能为空",
		})
		return
	}

	if len(announcement.Title) > 100 {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": "公告标题长度不能超过 100 字符",
		})
		return
	}

	if len(announcement.Content) > 10000 {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": "公告内容长度不能超过 10000 字符",
		})
		return
	}

	// 设置时间戳
	now := time.Now().Unix()
	if announcement.ID == "" {
		announcement.ID = fmt.Sprintf("announcement_v%d", now)
		announcement.CreatedAt = now
	}
	announcement.UpdatedAt = now

	// 序列化
	announcementJSON, err := json.Marshal(announcement)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": "序列化公告数据失败",
		})
		return
	}

	// 更新数据库
	err = model.UpdateOption("Announcement", string(announcementJSON))
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": "更新公告失败: " + err.Error(),
		})
		return
	}

	// 更新内存
	config.OptionMapRWMutex.Lock()
	config.OptionMap["Announcement"] = string(announcementJSON)
	config.OptionMapRWMutex.Unlock()

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "公告更新成功",
	})
}

// GetHomePageConfig 获取首页配置
func GetHomePageConfig(c *gin.Context) {
	config.OptionMapRWMutex.RLock()
	defer config.OptionMapRWMutex.RUnlock()

	configJSON := config.OptionMap["HomePageConfig"]

	var homePageConfig HomePageConfigOption
	if configJSON != "" {
		err := json.Unmarshal([]byte(configJSON), &homePageConfig)
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"success": false,
				"message": "解析首页配置失败",
				"data":    nil,
			})
			return
		}
	} else {
		// 返回默认配置
		homePageConfig = getDefaultHomePageConfig()
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "",
		"data":    homePageConfig,
	})
}

// UpdateHomePageConfig 更新首页配置（管理员）
func UpdateHomePageConfig(c *gin.Context) {
	var homePageConfig HomePageConfigOption
	err := c.ShouldBindJSON(&homePageConfig)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": "无效的请求参数",
		})
		return
	}

	// 验证
	if homePageConfig.Mode != "default" && homePageConfig.Mode != "custom" {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": "无效的首页模式",
		})
		return
	}

	if homePageConfig.Mode == "custom" && homePageConfig.Hero.Title == "" {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": "Hero 标题不能为空",
		})
		return
	}

	if len(homePageConfig.Hero.Title) > 200 {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": "Hero 标题长度不能超过 200 字符",
		})
		return
	}

	if len(homePageConfig.Features) > 12 {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": "特性列表不能超过 12 项",
		})
		return
	}

	if len(homePageConfig.Services) > 12 {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": "服务列表不能超过 12 项",
		})
		return
	}

	// 序列化
	configJSON, err := json.Marshal(homePageConfig)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": "序列化首页配置失败",
		})
		return
	}

	// 更新数据库
	err = model.UpdateOption("HomePageConfig", string(configJSON))
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": "更新首页配置失败: " + err.Error(),
		})
		return
	}

	// 更新内存
	config.OptionMapRWMutex.Lock()
	config.OptionMap["HomePageConfig"] = string(configJSON)
	config.OptionMapRWMutex.Unlock()

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "首页配置更新成功",
	})
}

// getDefaultHomePageConfig 获取默认首页配置
func getDefaultHomePageConfig() HomePageConfigOption {
	return HomePageConfigOption{
		Mode: "custom",
		Hero: HeroConfig{
			Title:    "Ailinkor API - 更强模型 更低价格 更易落地",
			Subtitle: "致力于为开发者提供快速、便捷的 Web API 接口调用方案，打造稳定且易用的 API 接口平台，一站式集成几乎所有 AI 大模型",
			CtaText:  "开启AI新体验",
			CtaLink:  "/register",
		},
		Features: []FeatureItem{
			{
				ID:          "feature_1",
				Icon:        "rocket",
				Title:       "#1 API",
				Description: "100%使用官方 API 渠道建设，已成功运行 1 年，承诺永久免费！",
			},
			{
				ID:          "feature_2",
				Icon:        "plug",
				Title:       "兼容性与支持",
				Description: "兼容 OpenAI 接口协议，畅享 Claude 等多种接口支持",
			},
			{
				ID:          "feature_3",
				Icon:        "dollar sign",
				Title:       "灵活计费",
				Description: "无需付费，即可使用 Midjourney 绘图，支持多种计费模式",
			},
			{
				ID:          "feature_4",
				Icon:        "globe",
				Title:       "全球布局",
				Description: "部署在全球多个数据中心，自动选择最优路径",
			},
		},
		Services: []ServiceItem{
			{
				ID:          "service_1",
				Icon:        "shield alternate",
				Title:       "服务保障",
				Description: "7x24 小时技术支持，确保服务稳定可靠",
			},
			{
				ID:          "service_2",
				Icon:        "chart line",
				Title:       "活动计费",
				Description: "按需付费，灵活调整，公开透明的计费规则",
			},
			{
				ID:          "service_3",
				Icon:        "image",
				Title:       "Midjourney",
				Description: "专业 AI 绘图服务，支持多种绘图模式和快速响应",
			},
			{
				ID:          "service_4",
				Icon:        "star",
				Title:       "#1 API",
				Description: "业界领先的 API 服务，承诺永久免费！",
			},
		},
	}
}
